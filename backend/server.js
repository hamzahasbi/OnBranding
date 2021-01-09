const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/database');

connectDB();

app.get('/', (req, res) => res.send('server runing'));

app.listen(PORT, () => {
    console.log('server started on port ' + PORT);
})