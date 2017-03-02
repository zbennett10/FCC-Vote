import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { createPoll, fetchAllPolls } from '../actions/index';
import Poll from './Poll';
import AddPollModal from './Modal_Add_Poll';
import SignupModal from './Modal_Signup';
import SigninModal from './Modal_Signin';
import { browserHistory } from 'react-router';


function findAllPolls(cb) {
  return fetch('http://localhost:3001/', {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

class App extends Component {
  constructor(props) {
    super(props)
    this.sendToUserProfile = this.sendToUserProfile.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.toggleSigninModal = this.toggleSigninModal.bind(this);

    this.state = {
      addPollModalOpen: false,
      signupModalOpen: false,
      signinModalOpen: false
    }
  }

  sendToUserProfile() {
    if(this.props.user.userID) {
      browserHistory.push(`/user/${this.props.user.userID}`);
    }
  }

  toggleSignupModal() {
    this.setState({signupModalOpen: !this.state.signupModalOpen});
  }

  toggleSigninModal() {
    this.setState({signinModalOpen: !this.state.signinModalOpen});
  }

  componentDidMount() {
    //dispatch function that gets initial state
    findAllPolls()
      .then(response => this.props.fetchAllPolls(response));
  }


  
  render() {
    const polls = this.props.polls.map(poll => {
          return <Poll key={poll._id} id={poll._id} title={poll.title} desc={poll.description}
                   options={poll.options}/>
    });

    return (
      <div className="app-main container">
        
        <header className="jumbotron text-center">
          <nav className="navbar navbar-light">
            <button onClick={this.toggleSigninModal}
                className="btn btn-lg btn-primary nav-item">Sign in
            </button>
            <button onClick={this.toggleSignupModal} 
                className="btn btn-lg btn-primary nav-item">Sign up
            </button>
            
            <button onClick={this.sendToUserProfile}
                className="btn btn-lg btn-success nav-item">Profile
              </button>
          </nav>
          <h1>Voter!</h1>
          
        </header>
        <ul className="list-group">
          {polls}
        </ul>

        
        <SignupModal open={this.state.signupModalOpen}
                     toggleOpen={this.toggleSignupModal}
                      />
        <SigninModal open={this.state.signinModalOpen}
                     toggleOpen={this.toggleSigninModal}
                     />

      {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createPoll, fetchAllPolls}, dispatch);
};

function mapStateToProps(state) {
  return {polls: state.polls, user: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);