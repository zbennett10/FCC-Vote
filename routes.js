const PollController = require('./controllers/poll_controller');
const UserController = require('./controllers/user_controller');

module.exports = (app) => {
    //define routes that get data here
    app.get('/', PollController.index);
    app.get('/poll/:id', PollController.fetchPoll);
    app.delete('/poll/:id', UserController.deletePoll);
    app.get('/user/:id', UserController.viewPolls);
    app.put('/poll/:id', UserController.addOption);
    app.post('/create-poll', UserController.createPoll);
    app.put('/poll/:id/vote', PollController.vote);
    app.post('/signup', UserController.signup);
}