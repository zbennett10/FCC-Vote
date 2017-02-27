import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { createPoll, viewPoll, fetchAllPolls } from '../actions/index';
import Poll from './Poll';
import Modal from 'react-modal';
import AddPollModal from './Modal_Add_Poll';


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

//this component recieves state from rootreducers and passes it down as props to each poll

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleAddPollModal = this.toggleAddPollModal.bind(this);

    this.state = {
      addPollModalOpen: false
    }
  }

  toggleAddPollModal() {
    this.setState({addPollModalOpen: !this.state.addPollModalOpen});
  }

  componentDidMount() {
    //dispatch function that gets initial state
    findAllPolls()
      .then(response => this.props.fetchAllPolls(response));
  }
  
  render() {

    const polls = this.props.polls.map(poll => {
          return <Poll key={poll._id} title={poll.title} desc={poll.description}
                   options={poll.options}/>
    });

    return (
      <div className="app-main container">
        <button className="add-poll-button btn btn-lg btn-primary"
                onClick={this.toggleAddPollModal}>Add Poll</button>
        <header className="jumbotron text-center">Welcome to Voter!</header>
        <ul className="list-group">
          {polls}
        </ul>

        <AddPollModal open={this.state.addPollModalOpen} 
                    toggleOpen={this.toggleAddPollModal}
                    fetchAllPolls={this.props.fetchAllPolls}/>
        

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createPoll, viewPoll, fetchAllPolls}, dispatch);
};

function mapStateToProps(state) {
  return {polls: state.polls}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);