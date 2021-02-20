const mongoose = require("mongoose");
const { Profile } = require("../models/Profile");
const Normalizer = require("../helpers/normalizer");

const ReferenceEnhancer = new Normalizer(true);
const FieldEnhancer = new Normalizer(false);

async function create({
    user,
    company,
    websites,
    location,
    status,
    skills,
    bio,
    interest,
    projects,
    posts,
    profiltags,
    resume,
    education,
}) {
    try {
        const normalizedTags = ReferenceEnhancer.normalize(skills);
        const uid = mongoose.Types.ObjectId(user?.id);
        const profile = new Profile({
            status,
            bio,
            interest,
        });

        profile.user = uid;
        profile.skills = normalizedTags;
        if (posts?.length >= 1) {
            profile.posts = ReferenceEnhancer.normalize(posts);
        }
        if (projects?.length >= 1) {
            profile.projects = ReferenceEnhancer.normalize(projects);
        }
        if (websites?.length >= 1) {
            profile.websites = FieldEnhancer.normalize(websites);
        }
        if (websites?.length >= 1) {
            profile.profiltags = FieldEnhancer.normalize(profiltags);
        }
        if (education?.length >= 1) {
            profile.education = FieldEnhancer.normalize(education);
        }
        if (resume) profile.resume = resume;
        if (company) profile.company = company;
        if (location) profile.location = location;

        await profile.save();
        return profile;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function update({
    user,
    id,
    company,
    websites,
    location,
    status,
    skills,
    bio,
    interest,
    projects,
    posts,
    profiltags,
    resume,
    education,
}) {
    try {
        const uid = mongoose.Types.ObjectId(user?.id);
        const normalizedTags = ReferenceEnhancer.normalize(skills);
        const normalizedPosts = ReferenceEnhancer.normalize(posts);
        const normalizedProjects = ReferenceEnhancer.normalize(projects);
        const normalizedwebsites = FieldEnhancer.normalize(websites);
        const normalizedProfileTags = FieldEnhancer.normalize(profiltags);
        const normalizeEducation = FieldEnhancer.normalize(education);
        const target = {
            company,
            location,
            status,
            bio,
            interest,
            resume,
        };
        if (normalizeEducation) target.education = normalizeEducation;
        if (normalizedTags) target.skills = normalizedTags;
        if (normalizedPosts) target.posts = normalizedPosts;
        if (normalizedProjects) target.projects = normalizedProjects;
        if (normalizedwebsites) target.websites = normalizedwebsites;
        if (normalizedProfileTags) target.profiltags = normalizedProfileTags;
        const updated = await Profile.findOneAndUpdate(
            { user: uid, _id: id },
            target,
            { omitUndefined: true, new: true },
        ).exec();
        return updated;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function get(user, sort = { name: "asc" }, limit = 4, offset = 0) {
    try {
        let profile = null;
        let count = null;
        const Limit = parseInt(limit, 10);
        const Offset = parseInt(offset, 10);
        const filter = { user: mongoose.Types.ObjectId(user.id) };

        // public API.
        const options = {
            sort,
            limit: Limit,
            skip: Offset,
        };
        const query = Profile.find(filter, null, options);
        profile = await query
            .populate("user", "name email avatar")
            .populate("skills", "name icon intro")
            .populate("posts", "name link thumbnail")
            .populate("projects", "name link thumbnail")
            .exec();

        count = await query.countDocuments().exec();

        return { ressource: profile, count };
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function remove(property) {
    try {
        const id = property?.id;
        const filter = id
            ? { _id: mongoose.Types.ObjectId(id) }
            : { ...property };
        const deleted = await Profile.findOneAndDelete(filter).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}
const ProfileManager = {
    create,
    update,
    remove,
    get,
};

module.exports = ProfileManager;
