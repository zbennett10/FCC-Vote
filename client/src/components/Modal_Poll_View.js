import React, { Component } from 'react';
import { addPollOption } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Modal from 'react-modal';
import {modalStyle} from './modalStyle';
import Chart from './Chart';

//make call to update endpoint when an option needs to be changed
//open and close this modal in the same fashion as add poll modal

class PollViewModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const options = this.props.options.map(option => {
            return (
                <div class='checkbox'>
                    <label><input type='checkbox' value=''/>{option}</label>
                </div>
            )

        });

        return(
            <Modal name="viewPollModal" isOpen={this.props.open}
                    contentLabel="Modal"
                    style={modalStyle}>
                    <h1>{this.props.title}</h1>

                    <p>{this.props.desc}</p>

                    <div>
                        {options}
                    </div>

                    <footer>
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
    return bindActionCreators({addPollOption}, dispatch);
}

export default connect(null, mapDispatchToProps)(PollViewModal);