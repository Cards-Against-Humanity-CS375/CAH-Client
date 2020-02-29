import React, { Component } from "react"

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class DecidingDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.carouselItems = this.props.whiteCards.map((whiteCard) =>
            <Carousel.Item>
                <Card className="mb-4 box-shadow h-md-250" border="info" style={{ height: '26rem' }} bg="light">
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
                                <Button variant="outline-danger">Decide</Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        )
    }

    render() {
        <Carousel controls={false} slide={true} indicators={true} interval={5000} style={{ width: "21rem" }}>
            {this.carouselItems}
        </Carousel>
    }
}

export default DecidingDeck