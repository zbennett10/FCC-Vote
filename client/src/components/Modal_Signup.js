import React, { Component } from 'react';
import Modal from 'react-modal';
import { modalStyle } from './modalStyle';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {signup} from '../actions/index';

const renderInput = field => 
    <div className="col-10">
        <input {...field.input} className="form-control"/>
    </div>

class SignupModal extends Component {
    constructor(props) {
        super(props)
    }

    handleFormSubmit({email, password}) {
        this.props.signup({ email, password })();
        //submit this info to signin endpoint
        //if its good - reroute to profile page with user id (mongo id)
    }

    render() {
        return (
            <Modal name="signupModal" isOpen={this.props.open}
                    contentLabel="Modal"
                    style={modalStyle}>
                    <h1>Signin</h1> 
                    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>   
                      <div className="form-group row">
                        <label className="col-2 col-form-label">Email</label>
                          <Field
                            name="email"
                            component={renderInput}
                            type="email"
                          />
                      </div>

                      <div className="form-group row">
                        <label className="col-2 col-form-label">Password</label>
                          <Field
                            name="password"
                            component={renderInput}
                            type="password"
                          />
                      </div>
                      <button className="btn btn-lg btn-primary" action="submit">Sign in</button>
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
}

SignupModal = reduxForm({
    form:'signup',
    signup: signup
})(SignupModal);

SignupModal = connect(null, actions)(SignupModal);

export default SignupModal;