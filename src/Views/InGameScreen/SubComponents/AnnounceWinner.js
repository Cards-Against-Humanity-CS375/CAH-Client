import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"

class AnnounceWinner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                {this.props.won ? <Alert variant="success">"Woohoo, you won this round!"</Alert> : <Alert variant="danger">"Boooooo! You lost this round!"</Alert>}
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.provokeParentCloseWinMessage}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        )
    }

}

export default AnnounceWinner