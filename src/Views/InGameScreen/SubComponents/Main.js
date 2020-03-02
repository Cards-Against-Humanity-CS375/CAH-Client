import React, { Component } from "react"
import ShowPrompt from "./ShowPrompt"
import CardDeck from "./CardDeck"
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

class Main extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {

        }

        // This binding is necessary to make `this` work in the callback
        this.btnStartGame = this.btnStartGame.bind(this);
    }

    btnStartGame()
    {
        this.props.socket.emit('message', {
            type: 'GAME_START',
            content: "Hey Mr. Server! Please start the game!"
        })
    }

    render()
    {
        if (this.props.gameOn) {
            return (
                <div className="d-flex flex-column align-items-center">
                    <ShowPrompt blackCard={this.props.blackCard} />
                    <CardDeck whiteCards={this.props.whiteCards} />
                </div>
            )
        }
        else {
            if (this.props.isFirstPlayer) {
                return (
                    <div className="d-flex flex-column">
                        <Button variant="primary" onClick={this.btnStartGame}>Start Game</Button>
                    </div>
                )
            }
            else {
                return (
                    <div className="d-flex flex-column my-1 align-items-center justify-content-center flex-fill">
                        <Spinner animation="border" />
                        <div>Waiting for host to start the game...</div>
                    </div>
                    
                )
            }
        }
    }
}

export default Main