import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class JudgeDeck extends Component {
    constructor(props) {
        super(props)
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
    }

    render() {
        // TODO: Implement onClick function to emit "CARD_CHOSEN_JUDGE"
        console.log(this.props.playedCards)
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
                            <div className="col-8 pt-1">
                                <Image src="./assets/cah.svg" width="20" height="20" />
                            Cards Against Humanity
                        </div>
                            <div className="col-4 pt-1 d-flex justify-content-end">
                                {this.props.isJudge ? <Button variant="outline-primary" onClick={() => this.handleSubmit(whiteCard.response)}>Decide</Button> : <></>}
                            </div>
                        </div>
                    </Card.Footer>
                </Card> 
            </Carousel.Item>
        )
        return (
            <>
                {this.props.isJudge ? <div>Here are the cards everyone played! Let's decide! </div> : <div>Here are the cards everyone played! Waiting for judgement... </div>}
                <Carousel controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "21rem" }}>{carouselItems}</Carousel>
            </>
        )
    }
}

export default JudgeDeck