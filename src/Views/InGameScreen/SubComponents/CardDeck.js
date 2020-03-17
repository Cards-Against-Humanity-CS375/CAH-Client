import React, { Component } from "react"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Loading from './Loading'
const uniqid = require('uniqid');
const isTouchDevice = require('is-touch-device');

class CardDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chosen_card_text: ""
        }
    }

    sendCardChosenMessage(chosenCard) {
        console.log("sending message: ", chosenCard)
        this.props.socket.emit('message', {
            "type": "CARD_CHOSEN",
            "content": {
                "player_id": this.props.socket.id,
                "chosen_card": chosenCard
            }
        })

        this.setState({
            chosen_card_text: chosenCard.response
        })

        this.props.provokeParentChangeIsCardChosenState()
        this.props.provokeParentRemoveChosenWhiteCard(chosenCard)
    }

    render() {
        const carouselItems = this.props.whiteCards.map((whiteCard, index) =>
            <Carousel.Item key={whiteCard.response + `${index}` + uniqid()}>
                <Card className="mb-4 box-shadow h-md-250" border="dark" style={{ height: '26rem', boxShadow: "-0.2rem 0.09rem 0.5rem grey" }}>
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
                                <Button variant="primary" onClick={() => this.sendCardChosenMessage(whiteCard)}>Choose</Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        )

        if (!this.props.is_card_chosen) {
            return (
                <>
                    <div>
                        <Alert variant="primary"> Your cards:</Alert>
                    </div>
                    {/* <Carousel extraData={this.props.whiteCards} controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "21rem" }}> */}
                    <Carousel className="sha" slide={true} controls={true} indicators={true} interval={9500} style={{ width: "21rem" }}>
                        {carouselItems}
                    </Carousel>
                </>
            )
        }
        else {
            if (this.props.isJudgePicking) {
                return <></>
            }
            else {
                return (
                    <Loading message={`You chose: ${this.state.chosen_card_text}. Waiting for others to choose card...`} />
                )
            }
        }
    }
}

export default CardDeck