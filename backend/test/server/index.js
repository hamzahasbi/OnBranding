const express = require('express');
const app = express();


// Connect Database.

// Init Middlware.
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('server runing'));

// Defining Routes.
app.use('/api/profile', require(('../../src/routes/api/profile')));
app.use('/api/login', require(('../../src/routes/api/auth')));
app.use('/api/register', require(('../../src/routes/api/users')));

module.exports = app;
