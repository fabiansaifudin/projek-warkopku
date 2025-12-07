const express = require('express');
const dbconfig = require('./api/config/config');
// const { createDefault } = require('./api/settings/system');

const auth = require('./api/middlewares/auth');
const error = require('./api/middlewares/errors');

require('dotenv').config();
const unless = require('express-unless');
const path = require("path");
const cors = require('cors');

const app = express()

process.env.TZ = "Asia/Jakarta";
// const now = new Date();
// console.log(new Date(Date.now()).toString());
// createDefault();

app.use(cors());

// for parsing application/json
app.use(express.json())
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded
auth.authenticateToken.unless = unless

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/api', require('./api/routes/index'))
app.use(error.errorHandler)

dbconfig.connect(function (err) {
    if (err) {
        console.log("Database failed");
        return;
    }
    app.listen(process.env.PORT, () => console.log("Ready to go"))
});