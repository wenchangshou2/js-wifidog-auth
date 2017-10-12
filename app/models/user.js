'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const oAuthTypes = [
    'github',
    'twitter',
    'facebook',
    'google',
    'linkedin'
];
const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    provider: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    facekbook: {},
    twitter: {},
    github: {},
    goolge: {},
    linkedin: {}
});
const validatePresenceOf = value => value && value.length;

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
UserSchema.path('name').validate(function (name) {
    if (this.skipValidation()) return true;
});
UserSchema.methods={
    skipValidation: function () {
        return ~oAuthTypes.indexOf(this.provider);
    }
};
mongoose.model('User', UserSchema);