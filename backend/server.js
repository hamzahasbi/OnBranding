const express = require('express');
const config = require('config');
const app = express();
const PORT = process.env.PORT || config.get('PORT');
const {connectDB} = require('./config/database');
const db = process.env.DATABASE_URL || config.get('mongoURI');

// Connect Database.
connectDB(db);


// Init Middlware.
app.use(express.json({extended: false}));
app.use('/static', express.static(__dirname + '/public'));


app.get('/', (req, res) => res.send('Nothing to see Here API is UP and Runing'));

// Defining Routes.
app.use('/api/profile', require(('./src/routes/api/profile')));
app.use('/api/login', require(('./src/routes/api/auth')));
app.use('/api/register', require(('./src/routes/api/users')));

app.use((err, req, res, next) => res.status(500).json({errors: err}));


app.listen(PORT, () => {
    console.log('server started on port ' + PORT);
})
