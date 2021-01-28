const {User} = require('../models/User');
const gravatar = require('gravatar');
const {hashPassword} = require('./PasswordManager');


async function create({name, email, password}) {
    try {
        let user = await User.findOne({email});
        if (user) {
            return null;
        }


        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        
        user = new User({
            name,
            email,
            avatar,
            password,
        });

        const {hash, salt} = hashPassword(password);
        user.password = hash;
        user.salt = salt;
        await user.save();

        return payload = {
            user: {
                id: user.id,
            }
        };

    } catch (exception) {
        console.error(exception);
        return null;
    }
}

async function remove(property) {
    try {
        const id = property?.id;
        const filter = id ? {_id: mongoose.Types.ObjectId(id)} : {...property};
        const deleted = await User.findOneAndDelete(filter).exec();
        return deleted;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function update({id, name, password}) {
    
    try {

        const {hash, salt} = hashPassword(password);
        const updated = await User.findByIdAndUpdate(id, {name, hash, salt}, {omitUndefined: true, new: true}).exec();
        return updated;
    } catch(err) {
        console.error(err);
        return null;
    }
}
module.exports = UserManager = {
    create,
    remove,
    update
}