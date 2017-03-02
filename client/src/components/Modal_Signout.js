import React, { Component } from 'react';
import Modal from 'react-modal';

class SignoutModal extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Modal name="signoutModal" isOpen={this.props.open}
                    contentLabel="Modal">
                <header className="jumbotron text-center">    
                    <h1>Goodbye!</h1>
                </header>
                <div className="btn-group">
                    <button className="btn btn-lg btn-danger"
                            onClick={this.props.toggleOpen}>
                            Close
                    </button>
                </div>
            </Modal>
        );
    }
}

export default SignoutModal;