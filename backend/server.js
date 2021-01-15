const express = require('express');
const config = require('config');
const app = express();
const PORT = process.env.PORT || 5000;
const {connectDB} = require('./config/database');
const db = config.get('mongoURI');

// Connect Database.
connectDB(db);

// Init Middlware.
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('server runing'));

// Defining Routes.
app.use('/api/profile', require(('./src/routes/api/profile')));
app.use('/api/login', require(('./src/routes/api/auth')));
app.use('/api/register', require(('./src/routes/api/users')));



app.listen(PORT, () => {
    console.log('server started on port ' + PORT);
})
