const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database.

// Init Middlware.
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('server runing'));

// Defining Routes.
// app.use('/api/profile', require('../../src/routes/api/profile'));
app.use('/api/login', require('../../src/routes/api/auth'));
app.use('/api/register', require('../../src/routes/api/users'));
app.use('/api/skill', require('../../src/routes/api/skill'));
app.use('/api/post', require('../../src/routes/api/post'));
app.use('/api/project', require('../../src/routes/api/project'));

// Errors Routes.
app.use((err, req, res, next) => res.status(500).json({ errors: err }));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
