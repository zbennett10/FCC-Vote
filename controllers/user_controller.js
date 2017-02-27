const User = require('../models/user');
const Poll = require('../models/poll');
const mongoose = require('mongoose');


module.exports = {

    createPoll(req, res, next) {
        const pollProps = req.body;
        Poll.create(pollProps)
            .then((poll) => res.send(poll))
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
     }
}