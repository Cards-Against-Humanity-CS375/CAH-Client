import React, { Component } from "react"
import './InGameScreen.css'
import Container from 'react-bootstrap/Container';
import TimerProgressBar from "./SubComponents/ProgressBar"
import NavBar from "./SubComponents/NavBar"
import MessageBox from "./SubComponents/MessageBox"
import Main from "./SubComponents/Main"
import AnnounceWinner from "./SubComponents/AnnounceWinner"
import WinGame from "./SubComponents/WinGame"
import CantJoin from "./SubComponents/CantJoin"
import Player from "../../Models/Player"
import WhiteCard from "../../Models/WhiteCard"
import BlackCard from "../../Models/BlackCard"

import socket from '../../api/Socket'

/**
 * The main code for InGameScreen
 * @param {} props : contains information for current_player, score
 */
class InGameScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_player_name: this.props.location.state.current_player_name,
            current_player_id: "",
            current_player: new Player(undefined, this.props.location.state.current_player_name),
            blackCard: new BlackCard(""), //reset
            whiteCards: [], //reset
            online_players: [],
            timer: undefined, //reset
            timeout: 0, //reset
            message: "", //reset
            gameOn: false, //reset
            isJudge: false, //reset
            progressBarPercentage: 0, //reset
            time_passed: 0, //reset
            // first_player: false,
            cardChosen: false, //reset
            isJudgePicking: false, //reset
            // playedCards: [],
            is_first_player: false,
            show_message: false, //reset
            winning_card: "", //reset
            show_choosing_winning_card: false, //reset
            submissions: [], //reset
            should_announce_winner: false, //reset
            didWon: false, //reset
            is_card_chosen: false, //reset
            game_won: false, //reset
            can_join: true, //reset
            show_game_result: false //reset
        }

        this.dismissMessage = this.dismissMessage.bind(this)
        this.dismissCloseWinMessage = this.dismissCloseWinMessage.bind(this)
        this.changeCardChosenState = this.changeCardChosenState.bind(this)
        this.removeChosenWhiteCard = this.removeChosenWhiteCard.bind(this)
    }

    resolveScoreUpdates(playerIdAndScores) {
        const clone_online_players = [...this.state.online_players]
        const update_scores = clone_online_players.map((player, index) => {
            player.points = playerIdAndScores[index].player_score
            return player
        })
        this.setState({
            online_players: update_scores
        })
        // this.state.online_players.forEach((player, index) => {
        //     player.points = players[index].score;
        //     if (this.state.current_player.name === player.name) {
        //         this.state.current_player.points = players[index].score;
        //     }
        // }) 
    }

    resetGame(){
        const clone_online_players = [...this.state.online_players]
        const update_scores = clone_online_players.map((player, index) => {
            player.points = 0
            return player
        })
        this.setState({
            online_players: update_scores
        })
        this.setState({
            blackCard: new BlackCard(""), //reset
            whiteCards: [],
            timer: undefined, //reset
            timeout: 0, //reset
            message: "", //reset
            gameOn: false, //reset
            isJudge: false, //reset
            progressBarPercentage: 0, //reset
            time_passed: 0, //reset  
            cardChosen: false, //reset
            isJudgePicking: false, //reset
            show_message: false, //reset
            winning_card: "", //reset
            show_choosing_winning_card: false, //reset
            submissions: [], //reset
            should_announce_winner: false, //reset
            didWon: false, //reset
            is_card_chosen: false, //reset
            game_won: false, //reset
            can_join: true, //reset
            show_game_result: false //reset
        })
    }

    UNSAFE_componentWillMount() {
        if (socket) {
            this.tellServerYouJoin()
        }
    }

    tellServerYouJoin() {
        this.setState((prev_state) => ({
            current_player_id: socket.id,
            current_player: new Player(socket.id, prev_state.current_player_name)
        }))

        // * Telling the server that you just joined the name
        socket.emit('message', {
            "type": "NEW_CONNECTION",
            "content": this.state.current_player.name
        })
    }

    componentDidMount() {
        socket.on('message', function (msg) {
            switch (msg.type) {
                case "CANT_JOIN":
                    this.setState({
                        can_join: false
                    })
                    break
                case "PLAYERS_UPDATED":
                    const players_on_server = msg.content.players

                    const result = players_on_server.map(player_on_server => new Player(player_on_server.id, player_on_server.name))

                    this.setState({
                        online_players: result
                    })
                    break
                case "FIRST_PLAYER_RIGHTS":
                    this.setState({
                        is_first_player: msg.content.first_player
                    })
                    break
                case "MISSING_PLAYERS":
                    this.setState({
                        message: msg.content,
                        show_message: true
                    })
                    break
                case "GAME_START":
                    // setGameOver(prev_gameOver => false)
                    const cards = msg.content.cards.map((cardObj => new WhiteCard(cardObj.response)))
                    this.setState(() => ({
                        gameOn: true,
                        whiteCards: cards,
                    }))
                    break
                case "NEW_ROUND":
                    clearInterval(this.state.timer)
                    this.setState((prev_state) => ({
                        isJudge: this.isMeJudge(msg.content.newJudgeID),
                        blackCard: msg.content.blackCard,
                        timer: setInterval(() => {
                            this.setState((prev_state) => ({
                                time_passed: prev_state.time_passed + 1000,
                                progressBarPercentage: prev_state.time_passed / prev_state.timeout * 100
                            }))
                        }, 1000),
                        timeout: msg.content.timeout,
                        time_passed: 0,
                        isJudgePicking: false,
                        progressBarPercentage: 0,
                        didWon: false,
                        submissions: [],
                        should_announce_winner: false,
                        is_card_chosen: false,
                        whiteCards: [...prev_state.whiteCards, new WhiteCard(msg.content.newWhiteCard.response)]
                    }))
                    break
                case "GAME_OVER":
                    this.setState({
                        game_won: msg.content.didWon,
                        show_game_result: true
                    })
                    break
                case "ROUND_TIMEOUT":
                    clearInterval(this.state.timer)
                    this.setState({
                        show_choosing_winning_card: true,
                        submissions: msg.content.submissions.map(submission => new WhiteCard(submission.played_card)),
                        timer: setInterval(() => {
                            this.setState((prev_state) => ({
                                time_passed: prev_state.time_passed + 1000,
                                progressBarPercentage: prev_state.time_passed / prev_state.timeout * 100
                            }))
                        }, 1000),
                        timeout: msg.content.timeout,
                        time_passed: 0,
                        isJudgePicking: msg.content.isJudgePicking,
                        progressBarPercentage: 0
                    })
                    break
                case "SCORE_UPDATED":
                    this.resolveScoreUpdates(msg.content.playerIdAndScores);
                    clearInterval(this.state.timer)
                    let won = false
                    msg.content.playerIdAndScores.forEach((player) => {
                        if (player.player_id === socket.id) {
                            if (player.player_won) {
                                won = true
                            }
                        }
                    })
                    this.setState({
                        winning_card: msg.content.cardText,
                        should_announce_winner: true,
                        didWon: won,
                        timer: setInterval(() => {
                            this.setState((prev_state) => ({
                                time_passed: prev_state.time_passed + 1000,
                                progressBarPercentage: prev_state.time_passed / prev_state.timeout * 100
                            }))
                        }, 1000),
                        timeout: msg.content.timeout,
                        time_passed: 0,
                    })
                    break
                case "RESET_GAME":
                    this.resetGame();
                    break
                default:
                    break
            }
        }.bind(this))
    }

    componentWillUnmount() {
        socket.close()
        clearInterval(this.state.timer)
    }


    isMeJudge(judgeId) { // Pass the msg.content.newJudgeID
        return judgeId === socket.id
    }

    dismissMessage() {
        this.setState({
            show_message: false
        })
    }

    dismissCloseWinMessage() {
        this.setState({
            should_announce_winner: false
        })
    }

    changeCardChosenState() {
        this.setState({
            is_card_chosen: true
        })
    }

    removeChosenWhiteCard(chosenCard) {
        const remainingCards = this.state.whiteCards.filter(whiteCard => whiteCard.response !== chosenCard.response)
        this.setState({
            whiteCards: remainingCards
        })
    }

    render() {
        return (
            <>
                <TimerProgressBar progress={this.state.progressBarPercentage} />
                <Container> 
                    <NavBar points={this.state.current_player.points} online_players={this.state.online_players} current_player={this.state.current_player} />
                    {/* Make sure there is a message component below to check if there are enough players (Ex. Players needed left: 2) */}
                    {/* TODO: Implement judge pick card on client side */}
                    <Main provokeRemoveChosenWhiteCard={this.removeChosenWhiteCard} provokeChangeIsCardChosenState={this.changeCardChosenState} is_card_chosen={this.state.is_card_chosen} gameOn={this.state.gameOn} cardChosen={this.state.cardChosen} playedCards={this.state.submissions} isJudgePicking={this.state.isJudgePicking} isJudge={this.state.isJudge} isFirstPlayer={this.state.is_first_player} socket={socket} whiteCards={this.state.whiteCards} blackCard={this.state.blackCard} />
                    {/* Make sure there is a message component below to check if there are enough players (Ex. Players needed left: 2) */}
                    <MessageBox message={this.state.message} show={this.state.show_message} provokeParentDismiss={this.dismissMessage} />
                    {!this.state.isJudge ? <AnnounceWinner winning_card={this.state.winning_card} show={this.state.should_announce_winner} won={this.state.didWon} provokeParentCloseWinMessage={this.dismissCloseWinMessage} /> : <></>}
                    <WinGame show={this.state.show_game_result} won={this.state.game_won} socket={socket} isFirstPlayer={this.state.is_first_player} />
                    <CantJoin show={!this.state.can_join} />
                </Container>
            </>
        )
    }
}

export default InGameScreen