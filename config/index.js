'use strict';

const path = require('path');
const development = require('./env/development');
const notifier = {

};
const defaults = {
    root: path.join(__dirname, '..'),
    notifier: notifier
};
module.exports = {
    development: Object.assign({}, development, defaults)
}[process.env.NODE_ENV || 'development'];