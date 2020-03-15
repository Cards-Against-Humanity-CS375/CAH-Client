import React, { Component } from "react"

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Loading from "./Loading"

class ChooseWinCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const carouselItems = this.props.chosenWhiteCards.map((whiteCard, index) =>
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
                                <Button variant="outline-primary">Decide</Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        )

        if (this.props.show) {
            if (this.props.isJudge) {
                return (
                    <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Carousel controls={false} slide={true} indicators={false} interval={1000000} style={{ width: "18rem" }}>
                            {carouselItems}
                        </Carousel>
                    </Modal>
                )
            }
            else {
                return (
                    <Loading message="The Judge is deciding, please wait..." />
                )
            }
        }
        else {
            return (
                <></>
            )
        }
    }
}

export default ChooseWinCard