import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"

class WinGame extends Component {
    constructor(props) {
        super(props)
    }
    sendResetGame() {
        console.log("Hello")
        this.props.socket.emit('message', {
            "type": "RESET_GAME",
        })
    }

    render() {
        return (
            <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                {this.props.won ? <Alert variant="success">"Woohoo, you won the game!"</Alert> : <Alert variant="danger">"Boooooo! You lost this game!"</Alert>}
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.provokeParentCloseWinMessage}>
                        Close
                    </Button>
                </Modal.Footer> */}
                {this.props.isFirstPlayer ? <Button variant="primary" onClick={()=> this.sendResetGame()}>Reset Game</Button> : null}
            </Modal>
        )
    }

}

export default WinGame