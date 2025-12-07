const express = require('express');
const app = express.Router()

app.use('/auth', require('./auth.router'))
app.use('/user', require('./user.router'))
app.use('/post', require('./post.router'));

module.exports = app