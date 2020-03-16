import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
const isTouchDevice = require('is-touch-device');

class JudgeDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_decided: false
        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleSubmit = (cardText) => {
        if (this.props.isJudge) {
            this.props.socket.emit('message', {
                "type": "JUDGE_CHOSEN_CARD",
                "content": {
                    cardText: cardText,
                }
            });
        } else {
            console.log("You are not the judge!")
        }
        this.setState({
            is_decided: true
        })
    }

    handleClose = () => {
        this.setState({
            is_decided: false
        })
    }

    render() {
        // TODO: Implement onClick function to emit "CARD_CHOSEN_JUDGE"
        // console.log(this.props.playedCards)
        let playedCards = this.props.playedCards.filter(whiteCard => whiteCard.response)
        let carouselItems = playedCards.map((whiteCard, index) => // whiteCard is a string.
            <Carousel.Item key={index}>
                <Card className="mb-4 box-shadow h-md-250" border="dark" style={{ height: '26rem' }}>
                    <Card.Body className="d-flex flex-column align-items-start">
                        <Card.Text>
                            {whiteCard.response}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <div className="row flex-nowrap justify-content-between align-items-center">
                            <div className="col-12 pt-1 d-flex-inline flex-column text-center">
                                <Image src="./assets/cah.svg" width="20" height="20" />
                            Cards Against Humanity
                            </div>
                        </div>
                        <div className="row flex-nowrap justify-content-between align-items-center">
                            <div className="col-12 pt-1 mt-3 d-flex flex-column">
                                {this.props.isJudge ? <Button variant="danger" onClick={() => this.handleSubmit(whiteCard.response)}>Choose</Button> : <></>}
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        )
        return (
            <>
                {this.props.isJudge
                    ?
                    <Alert variant="warning">
                        <div>Here are the cards everyone played! Let's decide! </div>
                    </Alert>
                    :
                    <Alert variant="secondary">
                        <div>Here are the cards everyone played! Waiting for judgement... </div>
                    </Alert>
                }
                <Carousel controls={false} slide={true} indicators={true} interval={1000000} style={{ width: "21rem" }}>{carouselItems}</Carousel>
                <Modal show={this.state.is_decided} onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title>You're amazing!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Decision sending to other players... You're rock!!!</Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </>
        )
    }
}

export default JudgeDeck