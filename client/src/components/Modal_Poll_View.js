import React, { Component } from 'react';
import { fetchAllPolls, fetchUserPolls } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Modal from 'react-modal';
import {modalStyle} from './modalStyle';
import Chart from './Chart';

class PollViewModal extends Component {
    constructor(props) {
        super(props)

        this.onVote = this.onVote.bind(this);
        this.onAddOption = this.onAddOption.bind(this);
    }

    onVote(optionTitle) {
        //change this call based on url
        if(this.props.path !== `/user/${this.props.userID}`) {
        axios.put(`http://localhost:3001/poll/${this.props.id}/vote`, {options: {title: optionTitle}})
            .then(() => {
                axios.get('http://localhost:3001/')
                    .then((response) => {
                        this.props.fetchAllPolls(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        } else {
            axios.put(`http://localhost:3001/poll/${this.props.id}/vote`, {options: {title: optionTitle}})
            .then(() => {
                axios.get(`http://localhost:3001/user/${this.props.userID}`)
                    .then((response) => {
                        console.log(response.data);
                        this.props.fetchUserPolls(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        }
    }

    

    onAddOption() {
        if(!this.refs.addOptionInput.value) return;
        //make request to update option endpoint
        axios.put(`http://localhost:3001/poll/${this.props.id}`, {options: {title: this.refs.addOptionInput.value}})
            .then(() => {
                axios.get('http://localhost:3001/')
                    .then((response) => {
                        this.props.fetchAllPolls(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));

            this.refs.addOptionInput.value = ''; //clear text in input
    }

    render() {
        const options = this.props.options.map(option => {
            return (
                <div className='checkbox'>
                    <label className="vote-option">{option.title}</label>
                    <button className="btn btn-sm btn-success"
                            onClick={() => this.onVote(option.title)}>Vote</button>
                </div>
            )
        });

        //check state to see if user is authenticated and render add option input if it is

        return(
            <Modal name="viewPollModal" isOpen={this.props.open}
                    contentLabel="Modal"
                    style={modalStyle}>
                    <h1>{this.props.title}</h1>

                    <p>{this.props.desc}</p>

                    <div className="row">
                        <div className="col-4 option-container">
                            {options}
                            <button className="btn btn-sm btn-primary add-option-button"
                                    onClick={this.onAddOption}
                                    >Add Option</button>
                            <input className="form-control"
                                type="text" placeholder="Option name"
                                ref="addOptionInput"/>
                        </div>
                        <div className="col-8">
                            <Chart options={this.props.options}/>
                        </div>
                    </div>

                    <footer className="navbar navbar-fixed-bottom">
                          <div className="btn-group">
                              <button className="btn btn-lg btn-danger"
                                  onClick={this.props.toggleOpen}>Close</button>
                          </div>
                    </footer>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAllPolls, fetchUserPolls}, dispatch);
}

function mapStateToProps(state) {
    return {polls: state.polls};
}

export default connect(mapStateToProps, mapDispatchToProps)(PollViewModal);