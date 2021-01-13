const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,
             { 
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
             });
        console.log('Connected');
    } catch(e) {
        console.log(e);
    }
};


module.exports = connectDB;