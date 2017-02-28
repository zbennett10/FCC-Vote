import React, { Component } from 'react';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPolls } from '../actions/index';


class UserProfile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                User profile
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUserPolls }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserProfile);