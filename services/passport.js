const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

const localOptions = { 
    usernameField: 'email',
    //passReqToCallback : true
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email}, function(err, user) {
        if (err) {
           return  done(err)
        };
        if(!user) return done(null, false);
       
        
        user.comparePassword(password, function(err, isMatch) {
            console.log('comparing password');
            if(err) {
                return done(err);
            }
            if(!isMatch) {
                console.log(isMatch);
                done(null, false);
            } 
            console.log('username and password matched');
            return done(null, user, {message: 'login success'});
        });
    })
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, function(err, user) {
        if(err) return done(err, false);
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);