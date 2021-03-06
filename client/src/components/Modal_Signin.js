import React, { Component } from 'react';
import Modal from 'react-modal';
import { modalStyle } from './modalStyle';
import { reduxForm, Field } from 'redux-form';
import {signin} from '../actions/index';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

const renderInput = field => 
    <div className="col-10">
        <input {...field.input} type="password" className="form-control"/>
    </div>


class SigninModal extends Component {
    constructor(props) {
        super(props)

    }

    handleFormSubmit({email, password}) {
        this.props.signin({ email, password })();
        //submit this info to signin endpoint
        //if its good - reroute to profile page with user id (mongo id)
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Ooops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        
        return (
            <Modal name="signinModal" isOpen={this.props.open}
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
                      {this.renderAlert()}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signin}, dispatch);
}

function mapStateToProps(state) {
    return { errorMessage: state.user.error}
}


// export default connect(null, {
// onSubmit: signin
// })(reduxForm({
//     form: 'signin',
//     signin: signin
// }, null, mapDispatchToProps)(SigninModal));

SigninModal = reduxForm({
    form:'signin',
    signin: signin
})(SigninModal);

SigninModal = connect(mapStateToProps, mapDispatchToProps)(SigninModal);

export default SigninModal;