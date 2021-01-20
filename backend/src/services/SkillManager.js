
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


async function remove({name}) {
    try {
        const deleted = await Skill.findOneAndDelete(name).exec();
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
    update
}