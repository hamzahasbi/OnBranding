const express = require('express');
const config = require('config');
const path = require('path');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || config.get('PORT');
const db = process.env.DATABASE_URL || config.get('mongoURI');

// Connect Database.
connectDB(db);

// Init Middlware.
app.use(express.json({ extended: false }));
app.use('/static', express.static(`${__dirname}/public`));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => res.send('Nothing to see Here API is UP and Runing'));

// Defining Routes.
// app.use('/api/profile', require('./src/routes/api/profile'));
app.use('/api/login', require('./src/routes/api/auth'));
app.use('/api/register', require('./src/routes/api/users'));
app.use('/api/skill', require('./src/routes/api/skill'));
app.use('/api/post', require('./src/routes/api/post'));
app.use('/api/project', require('./src/routes/api/project'));

app.use((err, req, res, next) => res.status(500).json({ errors: err }));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
