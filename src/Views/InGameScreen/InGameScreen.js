import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './InGameScreen.css'
import Container from 'react-bootstrap/Container';
import TimerProgressBar from "./SubComponents/ProgressBar"
import NavBar from "./SubComponents/NavBar"
import MessageBox from "./SubComponents/MessageBox"
import Main from "./SubComponents/Main"
import Player from "../../Models/Player"
import WhiteCard from "../../Models/WhiteCard"
import BlackCard from "../../Models/BlackCard"

/**
 * The main code for InGameScreen
 * @param {} props : contains information for current_player, score
 */
class InGameScreen extends Component
{
    constructor(props)
    {
        super(props)
        console.log(this.props.location.state.current_player)
        this.state = {
            current_player: this.props.location.state.current_player,
            blackCard: new BlackCard(""),
            whiteCards: [],
            players: [this.props.location.state.current_player],
            timer: undefined,
            timeout: 0,
            logs: ["A successful message!"],
            gameOn: false,
            endpoint: 'http://localhost:3001',
            isJudgeTurn: false,
            progress: 0,
            time_passed: 0,
            first_player: false
        }

    }

    componentDidMount()
    {
        this.setState({
            timeout: 60,
            time_passed: 1
        })

        this.state.timer = setInterval(() =>
        {
            this.setState((prev_state) => ({
                time_passed: prev_state.time_passed + 1,
                progress: prev_state.time_passed / prev_state.timeout * 100
            }))
        }, 1000)


        this.socket = socketIOClient(this.state.endpoint)

        this.socket.on('connect', () =>
        {
            this.setState(prev_state => ({
                current_player: new Player(this.socket.io, prev_state.current_player.name)
            }))

            // * Telling the server that you just joined the name
            this.socket.emit('message', {
                "type": "NEW_CONNECTION",
                "content": this.state.current_player.name
            })

            this.socket.on('message', function (msg)
            {
                switch (msg.type) {
                    case "PLAYERS_UPDATED":
                        console.log(msg.content)
                        const players_on_server = msg.content.players

                        const result = players_on_server.map(player_on_server => new Player(player_on_server.id, player_on_server.name))

                        this.setState({
                            players: result
                        })
                        break
                    case "FRIST_PLAYER_RIGHT":
                        console.log(msg.content)
                        this.setState({
                            first_player: msg.content['first_player']
                        })
                        break
                    case "GAME_START":
                        console.log(msg.content)

                        // msg.content.cards.forEach(card => {
                        //     const newCard = new WhiteCard(card.response)
                        //     setWhiteCards(prev_whiteCards => prev_whiteCards.push(newCard))
                        // })
                        // setGameOver(prev_gameOver => false)
                        const cards = msg.content.cards.map((cardObj => new WhiteCard(cardObj.response)))
                        console.log(cards)
                        this.setState(prev_state => ({
                            gameOn: true,
                            whiteCards: cards,
                        }))
                        console.log(this.state.whiteCards) // Expect array of 5 objects.
                        break
                    case "NEW_ROUND":
                        console.log(msg)
                        console.log(msg.content)
                        this.setState(
                            {
                                blackCard: msg.content.blackCard,
                            }
                        )
                        // setIsJudge(prev_is_judge => msg.content.judge_id == props.current_player.id)
                        break
                    case "GAME_OVER":
                        console.log(msg.content)
                        // TODO: Show popups
                        break
                    case "ROUND_TIMEOUT":
                        console.log(msg.content.played_cards)
                        break
                }
            }.bind(this))
        })
    }

    componentWillUnmount()
    {
        this.socket.close()
        clearInterval(this.state.timer)
    }

    render()
    {
        return (
            <>
                <TimerProgressBar progress={this.state.progress} />
                <Container>
                    <NavBar points={this.state.current_player.points} players={this.state.players} />
                    <Main gameOn={this.state.gameOn} isFirstPlayer={this.state.first_player} socket={this.socket} whiteCards={this.state.whiteCards} blackCard={this.state.blackCard} />
                    <MessageBox messages={this.state.logs} show={false} />
                </Container>
            </>
        )
    }
}

export default InGameScreen