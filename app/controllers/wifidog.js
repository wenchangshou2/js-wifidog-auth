'use strict';
const { guidGenerator } = require('../utils');
let fs = require('fs');
exports.ping = function (req, res) {
    res.send('pong');
};
exports.auth = function (req, res) {
    let query = req.query;
    let token = query['token'];
    if (token !== undefined) {
        let path = '/tmp/wifidog-auth/' + token;
        if (!fs.existsSync(path)) {
            return res.send('error');
        } else {
            let file = fs.readFileSync(path);
            let content = file.toString();
            let now = Date.now();
            let diff = now - parseInt(content);
            console.log(diff);
            if (diff > 3600000 * 2) {
                fs.unlinkSync(path);
                return res.send('Auth: 0');
            } else {
                return res.send('Auth: 1');
            }
        }
    } else {
        return res.send('Auth: 0');
    }
};
// http://localhost:3000/wifidog/login?gw_address=127.0.0.1&gw_port=3000&gw_id=080027F9A44E&mac=50:e5:49:5e:8d:2d&url=http%3A//www.baidu.com/
exports.login = function (req, res) {
    let query = req.query;
    let gw_address = query['gw_address'];
    let gw_port = query['gw_port'];
    let gw_id = query['gw_id'];
    let mac = query['mac'];
    let url = query['url'];
    let token = '';
    if (gw_address !== undefined && gw_port !== undefined) {
        token = guidGenerator();
        let path = '/tmp/wifidog-auth/';
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        let time = Date.now();
        let dir = fs.readdirSync('/tmp/wifidog-auth');
        fs.writeFileSync(path + token, time);
        console.log('http://' + gw_address + ':' + gw_port + '/wifidog/auth?token=' + token);
        return res.redirect('http://' + gw_address + ':' + gw_port + '/wifidog/auth?token=' + token);
    } else {
        return res.render('users/login', {
            title: 'Login'
        });
    }
};
exports.message = function (req, res) {
    let message = '';
    if (req.query['message'] !== undefined) {
        message = req.query['message'];
    }
    res.send(message);
};