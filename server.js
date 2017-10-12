'use strict';

require('dotenv').config();
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const models = join(__dirname, 'app/models');

const port = process.env.PORT || 3000;
const app = express();

module.exports = app;
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .on('open', listen);
function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('express app started on port ' + port);
}
function connect() {
    let options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}