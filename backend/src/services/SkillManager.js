const mongoose = require('mongoose');
const { Skill } = require('../models/Skill');

async function create({ name, description, icon }) {
  try {
    const skill = new Skill({
      name
    });
    if (description) skill.description = description;
    if (icon) skill.icon = icon;

    await skill.save();

    return skill;
  } catch (err) {
    return null;
  }
}

async function getAll() {
  try {
    const skills = await Skill.find({}, null, { sort: { name: 'asc' } }).exec();

    return skills;
  } catch (err) {
    return null;
  }
}

async function remove(property) {
  try {
    const id = property?.id;
    const filter = id ? { _id: mongoose.Types.ObjectId(id) } : { ...property };
    const deleted = await Skill.findOneAndDelete(filter).exec();
    return deleted;
  } catch (err) {
    return null;
  }
}

async function update({
  id, name, description, icon
}) {
  try {
    const updated = await Skill.findByIdAndUpdate(
      id,
      { name, description, icon },
      { omitUndefined: true, new: true }
    ).exec();
    return updated;
  } catch (err) {
    return null;
  }
}

const SkillManager = {
  create,
  remove,
  update,
  getAll
};

module.exports = SkillManager;
