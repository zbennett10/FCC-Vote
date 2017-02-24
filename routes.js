const PollController = require('./controllers/poll_controller');

module.exports = (app) => {
    //define routes that get data here
    app.get('/', PollController.index);
    app.get('/poll/:id', PollController.fetchPoll);
}