import React, { Component } from "react"
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
    checkIfJudge(passedID){ // Pass the msg.content.newJudgeID
        return (passedID === this.socket.id ? true : false)
    }
    setProgressTimer(){
        this.setState({
            timeout: 45000,
            time_passed: 0,
        })
        this.state.timer = setInterval(() =>
        {
            this.setState((prev_state) => ({
                time_passed: prev_state.time_passed + 1000,
                progress: prev_state.time_passed / prev_state.timeout * 100
            }))
        }, 1000)
    }
    componentDidMount()
    {
        
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
                        console.log("The new judge is:",msg.content.newJudgeID,",the current socket ID is:",this.socket.id)
                        this.setState(
                            {   
                                isJudgeTurn : this.checkIfJudge(msg.content.newJudgeID),
                                blackCard: msg.content.blackCard,
                            }
                        )
                        this.setProgressTimer()
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
                    {/* Make sure there is a message component below to check if there are enough players (Ex. Players needed left: 2) */}
                    <Main gameOn={this.state.gameOn} isJudgeTurn={this.state.isJudgeTurn} isFirstPlayer={this.state.first_player} socket={this.socket} whiteCards={this.state.whiteCards} blackCard={this.state.blackCard} />
                    <MessageBox messages={this.state.logs} show={false} />
                </Container>
            </>
        )
    }
}

export default InGameScreen