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

async function remove({email}) {
    try {
        const deleted = await User.findOneAndDelete(email, (err, res) => { 
            // if (err) res.status(500).json({errors: [{msg: 'An Error Occured!'}]});
            // else res.status(200).json('User Removed Successfully!');
        });
        return deleted;
    } catch (err) {
        console.error(err);
        return null;
    }
}


module.exports = {
    create,
    remove
}