import React, { Component } from "react"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class CardDeck extends Component {
    constructor(props) {
        super(props)
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
    }

    carouselItems = this.props.whiteCards.map((whiteCard, index) =>
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
                            <Button variant="outline-primary" onClick={() => this.sendCardChosenMessage(whiteCard)}>Choose</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Carousel.Item>
    )
    onSubmit = () => {
        console.log("onsubmit called")
    }
    render() {
        return (<>
        <div>Your cards:</div>
        <Carousel controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "21rem" }}>
            {this.carouselItems}
        </Carousel></>)
    }
}

export default CardDeck