const PollController = require('./controllers/poll_controller');
const UserController = require('./controllers/user_controller');
const passportService = require('./services/passport');
const passport = require('passport');

//use this on a route that needs authentication
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false }, {
    successRedirect: '/authenticated'
});

// passport.authenticate('local', function (err, account) {
//     req.logIn(account, function() {
//         res.status(err ? 500 : 200).send(err ? err : account);
//     });
// })(this.req, this.res, this.next);

module.exports = (app) => {
    //define routes that get data here
    app.get('/', PollController.index);
    app.get('/poll/:id', PollController.fetchPoll);
    app.delete('/poll/:id', UserController.deletePoll);
    app.get('/user/:id', UserController.viewPolls);
    app.put('/poll/:id', UserController.addOption);
    app.post('/user/:id/create-poll', UserController.createPoll);
    app.put('/poll/:id/vote', PollController.vote);
    app.post('/signup', UserController.signup);
    app.get('/authenticated', UserController.signin);
    app.post('/signin', requireSignin);
    app.get('/signout', UserController.signout);
}