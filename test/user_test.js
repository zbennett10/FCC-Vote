const assert = require('assert');
const moment = require('moment');
const User = require('../models/user');
const Poll = require('../models/poll');

describe('User Model', () => {
    let user, poll;

    beforeEach((done) => {
        const user = new User({
            name: 'Zach',
            joinDate: moment().format()
        });
        const poll = new Poll({
            title: 'Title', 
            options: ['trump', 'hilary'],
            description: 'description'
        });
        poll.user = user;
        user.polls.push(poll);
        
        Promise.all([user.save(), poll.save()])
            .then(() => done());
    });

    it('exists', (done) => {
        User.findOne({name: 'Zach'})
            .then((user) => {
                assert(user.name === 'Zach');
                done();
            });
    });

    it('contains reference to polls', (done) => {
        User.findOne({name: 'Zach'})
            .populate('polls')
            .then((user) => {
                assert(user.name === 'Zach');
                assert(user.polls[0].title === 'Title');
                done();
            });
    });
});