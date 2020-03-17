import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import Alert from "react-bootstrap/Alert"
import Image from 'react-bootstrap/Image';
class AnnounceWinner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>{this.props.won ? <Alert variant="success">"Woohoo, you won this round!"</Alert> : <Alert variant="danger">"Boooooo! You lost this round!"</Alert>}</Modal.Title>
                </Modal.Header>
                <Card className="mb-4 box-shadow h-md-250" border="dark" style={{ height: '26rem', boxShadow: "-0.2rem 0.09rem 0.5rem grey" }}>
                    <Card.Body className="d-flex flex-column align-items-start">
                        <Card.Text>
                            {this.props.winning_card}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <div className="row flex-nowrap justify-content-between align-items-center">
                            <div className="col-12 pt-1 d-flex-inline flex-column text-center">
                                <Image src="./assets/cah.svg" width="20" height="20" />
                            Cards Against Humanity
                        </div>
                        </div>
                    </Card.Footer>
                </Card>
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