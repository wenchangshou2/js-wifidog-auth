'use strict';
const users = require('../app/controllers/users');
const auth = require('./middlewares/authorization');

module.exports = function (app, passport) {
    const pauth = passport.authenticate.bind(passport);
    app.get('/login', users.login);
    // app.post('/users/session', pauth('local', {
    //     failureRedirect: '/login',
    //     failureFlash: 'Invalid email or password.'
    // }), users.session);
};