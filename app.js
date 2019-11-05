const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, cb) => {
        try {
            return models.User.findOne({where: {username: username, password: password}})
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect username or password.'});
                    }
                    return cb(null, user, {message: 'Logged In Successfully'});
                })
        } catch (err) {
            cb(err)
        }
    }
));

/**
 * Verifies that the token sent by the user is valid
 */
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret'
    }, (token, cb) => {
        try {
            //Pass the user details to the next middleware
            return cb(null, token.user);
        } catch (error) {
            cb(error);
        }
    }
));


const models = require('./models');
const auth = require('./routes/auth');
const home = require('./routes/home');
const users = require('./routes/users');

// logger
app.use(logger('dev'));

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// handlers
app.use('/auth', auth);
app.use('/', home);
app.use('/users', users);

// 404 error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
