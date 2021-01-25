
const {Post} = require('../models/Post');
const {User} = require('../models/User');
const mongoose = require('mongoose');



async function create({name, intro, link, tags, user}) {
    
    try {

        let post = new Post({
            name,
            intro,
            link
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

async function getAll(user, limit = 4, offset = 0) {
    try {
        let posts = null;

        if (user.hasOwnProperty('email')) {
            const {email} = user;
            posts = await Post.aggregate([
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
            ]).sort({name: 'asc'}).limit(limit).skip(offset).exec();
        }
        
        else {
            const options = {
                sort: {name: 'asc'},
                limit,
                skip: offset
            }
            posts = await Post.find({user}, null, options)
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


async function remove(properety) {
    try {
        const deleted = await Post.findOneAndDelete(properety).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}

async function removebyId({id}) {
    try {
        const deleted = await Post.findOneAndDelete(id).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}


async function update({id, name, intro, link, tags}) {
    
    try {

        const updated = await Post.findByIdAndUpdate(id, {name, intro, link, tags}, {omitUndefined: true, new: true}).exec();
        return updated;
    } catch(err) {
        return null;
    }
}

module.exports = SkillManager = {
    create,
    remove,
    update,
    removebyId,
    getAll,
}