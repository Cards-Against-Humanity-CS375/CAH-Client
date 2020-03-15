import React, { Component } from "react"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class CardDeck extends Component
{
    constructor(props)
    {
        super(props)
    }
    sendCardChosenMessage(chosenCard)
    {
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
        <Carousel.Item key={whiteCard.response}>
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
                            <Button variant="outline-primary"
                                onClick={
                                    // sendCardChosenMessage(whiteCard)
                                    () => { this.sendCardChosenMessage(whiteCard) }
                                }>Choose</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Carousel.Item>
    )
    onSubmit = () =>
    {
        console.log("onsubmit called")
    }
    render()
    {
        return (<Carousel controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "21rem" }}>
            {this.carouselItems}
        </Carousel>)
    }
}

// module.exports = { CardDeck }
export default CardDeck
// {
// let socket = this.props.socket
// function sendCardChosenMessage(chosenCard)
// {
//     console.log("Emitting card chosen message with chosen card:", chosenCard)
//     socket.emit('message', {
//         "type": "CARD_CHOSEN",
//         "content": {
//             "player_id": this.props.socket.id,
//             "chosen_card": chosenCard
//         }
//     })
// }
// const carouselItems = props.whiteCards.map((whiteCard) =>
//     <Carousel.Item>
//         <Card className="mb-4 box-shadow h-md-250" border="dark" style={{ height: '26rem' }}>
//             <Card.Body className="d-flex flex-column align-items-start">
//                 <Card.Text>
//                     {whiteCard.response}
//                 </Card.Text>
//             </Card.Body>
//             <Card.Footer className="text-muted">
//                 <div className="row flex-nowrap justify-content-between align-items-center">
//                     <div className="col-8 pt-1">
//                         <Image src="./assets/cah.svg" width="20" height="20" />
//                         Cards Against Humanity
//                     </div>
//                     <div className="col-4 pt-1 d-flex justify-content-end">
//                         <Button variant="outline-primary" onClick={
//                             // sendCardChosenMessage(whiteCard)
//                             () => { sendCardChosenMessage(whiteCard) }
//                         }>Choose</Button>
//                     </div>
//                 </div>
//             </Card.Footer>
//         </Card>
//     </Carousel.Item>
// )

//     return (
//         <Carousel controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "21rem" }}>
//             {carouselItems}
//         </Carousel>
//     )
// }

// export default CardDeck


