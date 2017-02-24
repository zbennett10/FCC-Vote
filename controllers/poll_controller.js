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
        console.log(req.params.id);
        Poll.findById(req.params.id)
            .populate('user')
            .then((poll) => {
                res.send(poll);
            })
            .catch(next);
    }
}