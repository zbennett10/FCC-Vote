const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const moment = require('moment');
const Poll = mongoose.model('poll');
const User = require('../models/user');

describe('User Controller', () => {
    let user1, user2, poll1, poll2, poll3;
    beforeEach((done) => {
        user1 = new User({name: 'Zach'});
        user2 = new User({name: 'Josh'});
        poll1 = new Poll({title: 'Poll1', options: ['Sandwich']});
        poll2 = new Poll({title: 'Poll2', options: ['Brick']});
        poll3 = new Poll({title: 'Poll3', options: ['Sauce']});
        user1.polls.push(poll1);
        user1.polls.push(poll2);
        user2.polls.push(poll3);
        poll1.user = user1;
        poll2.user = user1;
        poll3.user = user2;

        Promise.all([user1.save(), user2.save(), poll1.save(),
                    poll2.save(), poll3.save()])
                .then(() => done());
    });

    xit('allows a user to signin using facebook', (done) => {

    });

    xit('allows a user to sign in using twitter', (done) => {

    });

    xit('allows a user to sign out', (done) => {

    });

    //fix this test to check for authentication first
    it('allows user to delete one of their polls', (done) => {
        request(app)
            .delete('/poll/' + poll1.id)
            .end(() => {
                Poll.find({})
                    .then((polls) => {
                        assert(polls.length === 2);
                        done();
                    });
            });
    });

    //fix this test to check for authentication first
    it('allows user to view all of their polls', (done) => {
        request(app)
            .get('/user/' + user1.id)
            .end((error, response) => {
                assert(response.body.length == 2);
                done();
            });
    });

    //fix this test to check for authentication first
    it('allows user to add a voting option to their poll', (done) => {
        request(app)
            .put('/poll/' + poll1.id)
            .send({options: ['Falafel Hotdogs']})
            .end(() => {
                Poll.findById(poll1.id)
                    .then((poll) => {
                        assert(poll.options[1] === 'Falafel Hotdogs');
                        done();
                    })
            });
    });

    //fix this test to check for authentication and then addition to another user poll
    xit('allows user to add a voting option to another user poll', (done) => {
        request(app)
            .put('/poll/' + poll3.id)
            .send({options: ['Cinnamon']})
            .end(() => {
                Poll.findById(poll3.id)
                    .then((poll) => {
                        assert(poll3.options[1] === 'Cinnamon');
                        done();
                    });
            });
    });
});