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
        const optionToUpdate = req.body.options.title;
        console.log(optionToUpdate);
        Poll.findById(req.params.id)
            .then((poll) => {
                let updatedOptions = poll.options; //assign options array to a temp variable
                updatedOptions.forEach(option => {
                    if(option.title === optionToUpdate) option.votes++; //increment specific options vote count
                });

                Poll.findByIdAndUpdate(req.params.id, {options: updatedOptions}, {'new': true})
                    .then((poll) => {
                        res.send(poll);
                    })
                    .catch(next);
                });
    }
}
