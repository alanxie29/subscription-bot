var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 64000
    });
}

exports.registerUser = (req, res) => { console.log(req.body)
    if (!req.body.email || !req.body.password || !req.body.phoneNumber) {
        return res.status(400).json({'msg': 'You need to send email and password' });
    } 

    User.findOne ({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({'msg': err});
            }
            console.log(user)
            return res.status(201).json({'msg': "user created sucessfully"});
        });
    });

};

exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
 
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                console.log(user)
                return res.status(200).json({
                    token: createToken(user),
                    user: user
                });
                
            } else {
                return res.status(400).json({ msg: 'The email and password dont match.' });
            }
        });
    });
};