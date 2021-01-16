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

        user.password = hashPassword(password).hash;
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

async function remove({email}) {
    try {
        await User.findOneAndDelete(email, (doc) => {
            console.log('doc');
        });
        return 1;
    } catch (err) {
        console.error(exception);
        return -1;
    }
}


module.exports = {
    create,
    remove
}