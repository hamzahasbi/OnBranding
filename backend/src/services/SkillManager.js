
const {Skill} = require('../models/Skill');

async function create({name, description, icon}) {
    
    try {

        let skill = new Skill({
            name
        });
        if (description) skill.description = description;
        if (icon) skill.icon = icon;
    
        await skill.save();

        return skill;
    } catch(err) {
        return null;
    }

}

async function getAll() {
    try {

        let skills = await Skill.find({}, ).exec();
    
        return skills;
    } catch(err) {
        return null;
    }
}

async function remove(properety) {
    try {
        const deleted = await Skill.findOneAndDelete(properety).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}

async function removebyId({id}) {
    try {
        const deleted = await Skill.findOneAndDelete(id).exec();
        return deleted;
    } catch (err) {
        return null;
    }
}


async function update({id, name, description, icon}) {
    
    try {

        const updated = await Skill.findByIdAndUpdate(id, {name, description, icon}, {omitUndefined: true, new: true}).exec();
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
    getAll
}