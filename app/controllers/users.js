'use strict';

const mongoose = require('mongoose');
const { wrap: async } = require('co');

exports.login = function (req, res) {
    res.render('users/login', {
        title: ' Login'
    });
};

exports.session = login;

function login(req, res) {
    console.log('login');
    // const redirectTo = req.session.returnTo
    //     ? req.session.returnTo
    //     : '/';
    // delete req.session.returnTo;
    // res.redirect(redirectTo);
}