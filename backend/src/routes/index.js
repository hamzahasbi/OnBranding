const app = require('express')();
app.use('/api/profile', require('./api/profile'));
app.use('/api/login', require('./api/auth'));
app.use('/api/register', require('./api/users'));
app.use('/api/skill', require('./api/skill'));
app.use('/api/post', require('./api/post'));
app.use('/api/project', require('./api/project'));
