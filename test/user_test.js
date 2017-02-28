const assert = require('assert');
const moment = require('moment');
const User = require('../models/user');
const Poll = require('../models/poll');

describe('User Model', () => {
    let user, poll;

    beforeEach((done) => {
        const user = new User({
            email: 'Zach',
            joinDate: moment().format()
        });
        const poll = new Poll({
            title: 'Title', 
            options: [{title: 'trump'}, {title: 'hilary'}],
            description: 'description'
        });
        poll.user = user;
        user.polls.push(poll);
        
        Promise.all([user.save(), poll.save()])
            .then(() => done());
    });

    it('exists', (done) => {
        User.findOne({email: 'Zach'})
            .then((user) => {
                assert(user.email === 'Zach');
                done();
            });
    });

    it('contains reference to polls', (done) => {
        User.findOne({email: 'Zach'})
            .populate('polls')
            .then((user) => {
                assert(user.email === 'Zach');
                assert(user.polls[0].title === 'Title');
                done();
            });
    });
});