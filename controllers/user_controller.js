const User = require('../models/user');
const Poll = require('../models/poll');
const mongoose = require('mongoose');

module.exports = {
    deletePoll(req, res, next) {
        const pollId = req.params.id;
        Poll.findByIdAndRemove({_id: pollId})
            .then((poll) => res.status(204).send(poll))
            .catch(next);
    },

    viewPolls(req, res, next) {
        const userId = req.params.id;
        User.findById(userId)
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
            });
    },

    authCallback(req, res, next) {
        //call signin here
    },

    signOut(req, res, next) {

    }

    
}

//helper function that is used by authCallback
function signIn(req, res, next) {
        //authenticate
};