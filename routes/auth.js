const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                    return next(error)
                }

                //store user identity information: id, email, username
                const body = {id: user.id, email: user.email, username: user.username};
                //Sign the JWT token and populate the payload with the identity information
                const token = jwt.sign({user: body}, 'secret');
                //Send back the token to the user
                return res.json({body, token});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;