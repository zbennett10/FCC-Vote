import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { createPoll } from '../actions/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {modalStyle} from './modalStyle';


class AddPollModal extends Component {
    constructor(props) {
        super(props);
        this.addPoll = this.addPoll.bind(this);

    }

    addPoll(event) {
        event.preventDefault();
        const optionTitles = this.refs.pollOptions.value.split(',').map(word => word.trim());
        const pollProps = {
            title: this.refs.pollTitle.value,
            description: this.refs.pollDesc.value,
            options: []
        }
        optionTitles.forEach(title => pollProps.options.push({title: title, votes: 0}));
        axios.post(`http://localhost:3001/user/${this.props.userID}/create-poll`, pollProps)
            .then((response) => {
                this.props.createPoll([response.data])
            })
            .catch(error => {
                console.log(Object.assign({}, error));
                console.log(typeof error);
                console.log(Object.getOwnPropertyNames(error));
            });

        this.props.toggleOpen();
        return false;
    }

    render() {
        return (
            <Modal name="addPollModal" isOpen={this.props.open}
                    contentLabel="Modal"
                    style={modalStyle}>
                    <h1>Add Poll</h1> 
                    <form onSubmit={(event) => this.addPoll(event)}>              
                      <div className="form-group row">
                          <label htmlFor="poll-title" className="col-2 col-form-label">Title</label>
                          <div className="col-10">
                              <input ref="pollTitle" className="form-control" 
                                    type="text" id="poll-title"/>
                          </div>
                      </div>
                      <div className="form-group row">
                          <label htmlFor="poll-desc" className="col-2 col-form-label">Description</label>
                          <div className="col-10">
                              <textarea ref="pollDesc" className="form-control"
                                  placeholder="Describe your poll"/>
                          </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="poll-options" className="col-2 col-form-label">Options</label>
                        <div className="col-10">
                            <textarea ref="pollOptions" className="form-control"
                                placeholder="Enter your options seperated by commas here"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <input className="btn btn-lg btn-primary" type="submit"
                                />
                      </div>
                    </form>
                      
                      <footer>
                          <div className="btn-group">
                              <button className="btn btn-lg btn-danger"
                                  onClick={this.props.toggleOpen}>Close</button>
                          </div>
                    </footer>
            </Modal>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createPoll}, dispatch);
}

export default connect(null, mapDispatchToProps)(AddPollModal);