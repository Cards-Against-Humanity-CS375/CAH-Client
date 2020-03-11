import React, { Component } from "react"
import ShowPrompt from "./ShowPrompt"
import CardDeck from "./CardDeck"
import Button from 'react-bootstrap/Button';
import LoadingMessage from "./Loading"
import JudgeDeck from "./JudgeDeck"
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        // This binding is necessary to make `this` work in the callback
        this.btnStartGame = this.btnStartGame.bind(this);
    }

    btnStartGame() {
        this.props.socket.emit('message', {
            type: 'GAME_START',
            content: "Hey Mr. Server! Please start the game!"
        })
    }

    render() { // TODO: Need to check 2 bool values : Is it the judge's turn, and is it time for the judge to pick yet. 2 states.
        // TODO: Make separate component <JudgeChooseDeck>
        if (this.props.gameOn) {
            return (
                <div className="d-flex flex-column align-items-center">
                    <ShowPrompt blackCard={this.props.blackCard} />
                    {this.props.isJudgePicking ? <JudgeDeck isJudgeTurn={this.props.isJudgeTurn} playedCards={this.props.playedCards} /> : null }
                    {this.props.isJudgeTurn ? 
                    <LoadingMessage message="You are the Judge! Wait for everyone to pick a card first..." /> : 
                    <CardDeck cardChosen={this.props.cardChosen} whiteCards={this.props.whiteCards} />}
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
                    <LoadingMessage message="Waiting for host to start the game..." />
                )
            }
        }
    }
}

export default Main