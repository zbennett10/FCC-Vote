const User = require('../models/user');
const Poll = require('../models/poll');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


module.exports = {

    createPoll(req, res, next) {
        const userID = req.params.id;
        const pollProps = req.body;
        Poll.create(pollProps)
            .then((poll) => {
                User.findById(userID)
                    .then((user) => {
                        user.polls.push(poll);
                        poll.user = user;
                        Promise.all([user.save(), poll.save()])
                            .then(() => res.send(poll))
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    },

    deletePoll(req, res, next) {
        const pollId = req.params.id;
        Poll.findByIdAndRemove({_id: pollId})
            .then((poll) => res.status(204).send(poll))
            .catch(next);
    },

    viewPolls(req, res, next) {
        const userId = req.params.id;
        User.findById(userId)
            .populate('polls')
            .then((user) => {
                res.send(user.polls);
            })
            .catch(next);
    },

    addOption(req, res, next) {
        const pollId = req.params.id;
        Poll.findByIdAndUpdate(pollId, {$push: req.body}, {'new': true})
            .then((poll) => {
                res.send(poll);
            })
            .catch(next);
     },

     signup(req,res,next) {
         const email = req.body.email;
         const password = req.body.password;

         if(!email || !password) {
             return res.status(422).send({ error: 'You must provide email and password'});
         }

         User.findOne({email: email}, function(error, existingUser) {
             if(error) {return next(error);}

             if(existingUser) {
                 return res.status(422).send({error: 'Email is in use'});
             }

             const user = new User({
                 email: email,
                 password: password,
                 joinDate: moment().format()
             })
             user.save(function(err) {
                 if(err) return next(err);
                 res.json({ 
                     token: tokenForUser(user),
                     id: user.id
                    });
             });
         });
     },

     signin(req, res, next) {
         //give user token 
         console.log('sending token and user id');
         console.log(req.user);
         res.send({ 
             token: tokenForUser(req.user),
             id: req.user._id
            });
     },

     signout(req, res, next) {
         req.logout();
         res.send({success: 'Successfully logged out.'});
     }
}