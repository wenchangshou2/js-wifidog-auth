'use strict';
const users = require('../app/controllers/users');
const wifidog = require('../app/controllers/wifidog');
const auth = require('./middlewares/authorization');
module.exports = function (app, passport) {
    const pauth = passport.authenticate.bind(passport);
    app.get('/login', users.login);

    app.get('/wifidog/ping', wifidog.ping);
    app.get('/wifidog/login', wifidog.login);
    app.get('/wifidog/auth', wifidog.auth);
    app.get('/wifidog/message', wifidog.message);
    // app.post('/users/session', pauth('local', {
    //     failureRedirect: '/login',
    //     failureFlash: 'Invalid email or password.'
    // }), users.session);
};