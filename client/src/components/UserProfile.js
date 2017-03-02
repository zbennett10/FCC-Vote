import React, { Component } from 'react';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';
import AddPollModal from './Modal_Add_Poll';
import SignoutModal from './Modal_Signout';
import Poll from './Poll';
import axios from 'axios';


class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.toggleAddPollModal = this.toggleAddPollModal.bind(this);
        this.toggleSignoutModal = this.toggleSignoutModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            addPollModalOpen: false,
            signoutModalOpen: false
        }
    }
    //on component will mount, make call to /user/id endpoint with this.props.params.id
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.userID === null) {
            browserHistory.push('/');
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/user/${this.props.params.id}`)
                    .then(response => {
                        this.props.fetchUserPolls(response.data);
                    })
                    .catch((error) => console.log(error));
    }

    toggleAddPollModal() {
        this.setState({addPollModalOpen: !this.state.addPollModalOpen});
    }

    toggleSignoutModal() {
        this.setState({signoutModalOpen: !this.state.signoutModalOpen});
    }

    handleLogout() {
        this.props.signout();
        this.setState({signoutModalOpen: !this.state.signoutModalOpen});

        //log user out here
    }

    render() {
        if(this.props.user.userID === null) {
            return (
                <div>There was an error processing your request. Please go back and sign in again.</div>
            );
        } 

        const polls = this.props.polls.map(poll => {
            return (
            <Poll key={poll._id} 
                id={poll._id} 
                title={poll.title} 
                desc={poll.description}
                options={poll.options}
                userID={this.props.user.userID}
                path={this.props.location.pathname}/>
            );
        });

        return (
            <div>
                <header className="jumbotron center-text">
                    <h1>My Polls</h1>
                </header>

                <button className="add-poll-button btn btn-lg btn-primary"
                onClick={this.toggleAddPollModal}>Add Poll</button>

                <button className="btn btn-sm btn-warning"
                 onClick={this.handleLogout}>
                Logout
                </button>

                <button className="btn btn-lg btn-success"
                    onClick={() => browserHistory.push('/')}>
                    Home
                </button>
                
                <ul className="list-group">
                    {polls}
                </ul>


                <AddPollModal open={this.state.addPollModalOpen} 
                    toggleOpen={this.toggleAddPollModal}
                    userID={this.props.user.userID}/>
                <SignoutModal open={this.state.signoutModalOpen}
                    toggleOpen={this.toggleSignoutModal}/>
            </div>

        );
        
    }
}

function mapStateToProps(state) {
    return {polls: state.polls, user: state.user};
}



export default connect(mapStateToProps,actions)(UserProfile);