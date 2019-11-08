const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/login', 
    [
    check('email').not().isEmpty().withMessage('Email field is required'),
    check('password').not().isEmpty().withMessage('Password field is required')
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(err);
        console.log(user);
        console.log(info);

        if (err) {
            res.status(401).json(err);
        } else if (!user) {
            res.status(401).json(info);
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                 res.status(401).json(err);
            }

            //store user identity information: id, email, username
            const body = {id: user.id, email: user.email, username: user.username};
            //Sign the JWT token and populate the payload with the identity information
            const token = jwt.sign({user: body}, 'secret');
            //Send back the token to the user
            return res.json({body, token});
        });
    })(req, res);
});

module.exports = router;