const models = require('../models');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
    models.User.findAll({}).then(
        function (users) {
            res.send({
                users: users
            });
        });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    models.User.findByPk(id).then(
        function (users) {
            res.send({
                users: users
            });
        });
});

router.post('/create', [
    check('email').not().isEmpty().withMessage('Email field is required'),
    check('username').not().isEmpty().withMessage('Username field is required'),
    check('password').not().isEmpty().withMessage('Password field is required')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        models.User.create({
            email: req.body.email,
            username: req.body.username,
            password:req.body.password
        }).then(data => {
            res.send(data);
        });
    });
});

module.exports = router;
