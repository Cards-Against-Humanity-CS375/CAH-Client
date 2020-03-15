import React, { Component } from "react"

import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class MessageBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.message) {
            return (
                <Modal show={this.props.show} onHide={this.props.provokeParentDismiss} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Hi there!</Modal.Title>
                    </Modal.Header>
                    <Alert variant="success">
                        {this.props.message}
                    </Alert>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.provokeParentDismiss}>Close</Button>
                        {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
                    </Modal.Footer>
                </Modal>
            )
        }
        else {
            return (<></>)
        }
    }
}

export default MessageBox