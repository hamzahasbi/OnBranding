const mongoose = require('mongoose');
const { Profile } = require('../models/Profile');
const Normalizer = require('../helpers/normalizer');

const ReferenceEnhancer = new Normalizer(true);
const FieldEnhancer = new Normalizer(false);

async function create({
    user, company, websites, location, status,
    skills, bio, interest, projects, posts, profiltags, resume
}) {
    try {
        const normalizedTags = ReferenceEnhancer.normalize(skills);
        const uid = mongoose.Types.ObjectId(user?.id);
        const profile = new Profile(
            uid, status, bio, interest, normalizedTags
        );
        if (posts?.length) {
            profile.posts = ReferenceEnhancer.normalize(posts);
        }
        if (projects?.length) {
            profile.projects = ReferenceEnhancer.normalize(projects);
        }
        if (websites) {
            profile.websites = FieldEnhancer.normalize(websites);
        }
        if (websites) {
            profile.profiltags = FieldEnhancer.normalize(profiltags);
        }
        if (resume) profile.resume = resume;
        if (company) profile.company = company;
        if (location) profile.location = location;
        console.log(profile);
        await profile.save();
        return profile;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function update({
    id, company, websites, location, status,
    skills, bio, interest, projects, posts, profiltags, resume
}) {
    try {
        const normalizedTags = ReferenceEnhancer.normalize(skills);
        const normalizedPosts = ReferenceEnhancer.normalize(posts);
        const normalizedProjects = ReferenceEnhancer.normalize(projects);
        const normalizedwebsites = FieldEnhancer.normalize(websites);
        const normalizedProfileTags = FieldEnhancer.normalize(profiltags);

        const updated = await Profile.findByIdAndUpdate(
            id,
            {
                company,
                websites: normalizedwebsites,
                location,
                status,
                skills: normalizedTags,
                bio,
                interest,
                projects: normalizedProjects,
                posts: normalizedPosts,
                profiltags: normalizedProfileTags,
                resume
            },
            { omitUndefined: true, new: true }
        ).exec();
        return updated;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

const ProfileManager = {
    create,
    update,
};

module.exports = ProfileManager;
