import React, { Component } from "react"

import ShowPrompt from "./ShowPrompt"
import CardDeck from "./CardDeck"
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        if (this.props.gameOn) {
            return (
                <div className="d-flex flex-column align-items-center">
                    <ShowPrompt blackCard={this.state.blackCard} />
                    <CardDeck whiteCards={this.state.whiteCards} />
                </div>
            )
        }
        else {
            if (this.props.isFirstPlayer) {
                return (
                    <div className="d-flex flex-column">
                        <Button variant="primary" onClick={() => true}>Start Game</Button>
                    </div>
                )
            }
            else {
                return (
                    <div className="d-flex align-items-center justify-content-center flex-fill">
                        <Spinner animation="border" />
                    </div>
                )
            }
        }
    }
}

export default Main