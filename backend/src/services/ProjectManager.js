const mongoose = require('mongoose');
const { Project } = require('../models/Project');

async function create({
 name, intro, link, tags, user, thumbnail
}) {
    try {
        const project = new Project({
            name,
            intro,
            link,
            thumbnail,
        });

        project.user = mongoose.Types.ObjectId(user.id);

        let normalizedTags = [];
        if (tags) {
            if (Array.isArray(tags)) {
                normalizedTags = tags.map((tag) => mongoose.Types.ObjectId(tag.trim()),);
            } else {
                normalizedTags = tags
                    .split(',')
                    .map((tag) => mongoose.Types.ObjectId(tag.trim()));
            }
        }

        project.tags = normalizedTags;

        await project.save();

        return project;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function remove(property) {
    try {
        const id = property?.id;
        const filter = id
            ? { _id: mongoose.Types.ObjectId(id) }
            : { ...property };
        const deleted = await Project.findOneAndDelete(filter).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}

async function update({
 id, name, intro, link, tags, thumbnail
}) {
    try {
        let normalizedTags;
        if (tags) {
            if (Array.isArray(tags)) {
                normalizedTags = tags.map((tag) => mongoose.Types.ObjectId(tag.trim()),);
            } else {
                normalizedTags = tags
                    .split(',')
                    .map((tag) => mongoose.Types.ObjectId(tag.trim()));
            }
        }
        const updated = await Project.findByIdAndUpdate(
            id,
            {
                name,
                intro,
                link,
                tags: normalizedTags,
                thumbnail,
            },
            { omitUndefined: true, new: true },
        ).exec();
        return updated;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get(
    user,
    properties,
    sort = { name: 'asc' },
    limit = 4,
    offset = 0,
) {
    try {
        let projects = null;
        let count = null;
        const Limit = parseInt(limit, 10);
        const Offset = parseInt(offset, 10);

        // Filters can't be used both.
        const tags = properties?.tags;
        const projectId = properties?.id;

        let normalizedTags = [];

        if (tags) {
            if (Array.isArray(tags)) {
                normalizedTags = tags.map((tag) => mongoose.Types.ObjectId(tag.trim()),);
            } else {
                normalizedTags = tags
                    .split(',')
                    .map((tag) => mongoose.Types.ObjectId(tag.trim()));
            }
        }

        let filter = tags ? { tags: { $in: normalizedTags } } : {};
        filter = projectId ? { _id: mongoose.Types.ObjectId(projectId) } : {};

        // public API.
        if (user.hasOwnProperty('email')) {
            const { email } = user;
            const query = Project.aggregate([
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'users',
                        as: 'user',
                        // localField: 'user',
                        let: {
                            user: '$user',
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
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'skills',
                        as: 'tags',
                        localField: 'tags',
                        foreignField: '_id',
                    },
                },
                {
                    $match: { 'user.email': email },
                },
            ]);
            projects = await query.sort(sort).limit(Limit).skip(Offset).exec();
            count = await query.count('count').exec();
            count = count[0]?.count || 0;
        }
        // Private API
        else {
            const options = {
                sort,
                limit: Limit,
                skip: Offset,
            };
            const query = Project.find({ user, ...filter }, null, options);
            projects = await query
                .populate('user', 'name email avatar')
                .populate('tags', 'name icon')
                .exec();

            count = await query.countDocuments().exec();
        }
        return { ressource: projects, count };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const ProjectManager = {
    create,
    remove,
    update,
    get,
};
module.exports = ProjectManager;
