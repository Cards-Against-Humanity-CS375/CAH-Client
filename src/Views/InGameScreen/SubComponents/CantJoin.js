import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"

class CantJoin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Alert variant="danger">The game is going on! Please join later...</Alert>
            </Modal>
        )
    }

}

export default CantJoin