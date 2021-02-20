const mongoose = require('mongoose');

const connectDB = async (db) => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    } catch (e) {
        console.log(e);
    }
};

function closeDB() {
    return mongoose.disconnect();
}

module.exports = { connectDB, closeDB };
