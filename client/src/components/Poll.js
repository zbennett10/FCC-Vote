import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePoll, addPollOption } from '../actions/index';
import ViewPollModal from './Modal_Poll_View';

class Poll extends Component {
    constructor(props) {
        super(props)
        this.toggleViewPollModal = this.toggleViewPollModal.bind(this);

        this.state = {
            viewPollModalOpen: false
        }
    }

    toggleViewPollModal() {
        this.setState({viewPollModalOpen: !this.state.viewPollModalOpen});
    }

    //return card
    render() {
        return (
            <li className="list-item" onClick={this.toggleViewPollModal}>    
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">{this.props.title}</h4>
                    </div>
                </div>

                <ViewPollModal open={this.state.viewPollModalOpen}
                                toggleOpen={this.toggleViewPollModal}
                                title={this.props.title} desc={this.props.desc}
                                options={this.props.options}/>
            </li>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deletePoll, addPollOption }, dispatch);
}

export default connect(null, mapDispatchToProps)(Poll);