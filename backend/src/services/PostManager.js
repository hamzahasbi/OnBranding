
const {Post} = require('../models/Post');
const mongoose = require('mongoose');



async function create({name, intro, link, tags, user, thumbnail}) {
    
    try {

        let post = new Post({
            name,
            intro,
            link,
            thumbnail
        });

        post.user = mongoose.Types.ObjectId(user.id);

        let normalizedTags = [];
        if (tags) {
            if (Array.isArray(tags)) {
                normalizedTags = tags.map(tag => mongoose.Types.ObjectId(tag.trim()));
            } else {
                normalizedTags = tags.split(',').map(tag =>  mongoose.Types.ObjectId(tag.trim()));
            }
        }

        post.tags = normalizedTags;
    
        await post.save();
        
        return post;
    } catch(err) {
        console.log(err);
        return null;
    }

}


async function remove(properety) {
    try {
        const deleted = await Post.findOneAndDelete(properety).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}


async function update({id, name, intro, link, tags, thumbnail}) {
    
    try {
        let normalizedTags = undefined;
        if (tags) {
            if (Array.isArray(tags)) {
                normalizedTags = tags.map(tag => mongoose.Types.ObjectId(tag.trim()));
            } else {
                normalizedTags = tags.split(',').map(tag =>  mongoose.Types.ObjectId(tag.trim()));
            }
        }
        const updated = await Post.findByIdAndUpdate(id, {name, intro, link, tags: normalizedTags, thumbnail}, {omitUndefined: true, new: true}).exec();
        return updated;
    } catch(err) {
        console.error(err)
        return null;
    }
}

async function get(user, properties, sort = {name: 'asc'}, limit = 4, offset = 0) {
    try {
        let posts = null;
        limit = parseInt(limit);
        offser = parseInt(offset);
        // Filters can't be used both.
        const tags = properties?.tags;
        const postId = properties?.id;

        const filter = tags ? {'tags': { '$in': tags}} : (postId ? {'_id' : mongoose.Types.ObjectId(postId)} : {});

        // public API.
        if (user.hasOwnProperty('email')) {
            const {email} = user;
            posts = await Post.aggregate([
                {
                    $match: filter
                },
                {
                    $lookup: {
                        from: 'users',
                        as: 'user',
                        // localField: 'user', 
                        "let": {
                            user : "$user"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$email', email],
                                            },
                                            {
                                                $eq: ['$_id', '$$user'],
                                            }
                                        ]
                                    }
                                },
                            }
                        ],
                    }
    
                },
                {
                    $match: {'user.email': email}
                }
            ]).sort(sort).limit(limit).skip(offset).exec();
        }
        // Private API
        else {
            const options = {
                sort,
                limit,
                skip: offset
            }
            posts = await Post.find({user, ...filter}, null, options)
                .populate('user', 'name email avatar')
                .populate('tags', 'name icon')
                .exec();
        
        }
        return posts;
    } catch(err) {
        console.error(err);
        return null;
    }
}
module.exports = SkillManager = {
    create,
    remove,
    update,
    get,
}