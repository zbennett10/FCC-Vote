const Poll = require('../models/poll');
const mongoose = require('mongoose');

module.exports = {
    //define poll functions
    index(req, res, next) {
        Poll.find({})
            .populate('user')
            .then((polls) => {
                res.send(polls);
            })
            .catch(next);
    },

    fetchPoll(req, res, next) {
        Poll.findById(req.params.id)
            .populate('user')
            .then((poll) => {
                res.send(poll);
            })
            .catch(next);
    },

    vote(req, res, next) {
        Poll.findByIdAndUpdate(req.params.id, {$inc: {votes: 1}}, {'new': true})
            .then((poll) => {
                res.send(poll);
            })
            .catch(next);
    }
}