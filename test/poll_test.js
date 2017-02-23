const assert = require('assert');
const moment = require('moment');
const Poll = require('../models/poll');
const User = require('../models/user');

describe('Poll Model', () => {
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
        Promise.all([poll.save(), user.save()])
            .then(() => done());
    });

    it('is associated with its user', (done) => {
        Poll.findOne({title: "Title"})
            .populate('user')
            .then((poll) => {
                assert(poll.title === 'Title');
                assert(poll.user.name === 'Zach')
                done();
            }); 
    });
});