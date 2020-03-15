import React, { Component } from "react";
import Player from '../../Models/Player';
import Form from 'react-bootstrap/Form';
import './WelcomeScreen.css'
import logo from './logo.png'

class Welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player_name: '',
            validated: false
        }

        this.textInput = React.createRef();
    }

    onChange = (event) => {
        this.setState({
            player_name: event.target.value,
        })
    }

    onSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.textInput.current.focus();
        }
        else {
            this.props.history.push({ // We pass the state, and can access using this.props.location.state. LOCATION is important!
                pathname: '/ingame',
                state: { current_player_name: this.state.player_name }
            });
        }

        this.setState((prev_state) => ({
            validated: true
        }))
    }

    componentDidMount() {
        document.body.classList.add("welcome-screen-body")
        document.body.style.height = "100%"
        document.querySelector('html').style.height = "100%"

        this.textInput.current.focus();
    }

    componentWillUnmount() {
        document.body.classList.remove("welcome-screen-body")
        // document.body.classList.add("reset-this")
        document.body.style.height = ""
        document.querySelector('html').style.height = ""
    }

    render() {
        return (
            <div className="text-center">
                <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />
                    <h1 className="h3 mb-5 font-weight-normal">Cards Against Humanity</h1>
                    <label htmlFor="inputName" className="sr-only">Full name</label>
                    <input ref={this.textInput} type="fullName" id="inputName" className="form-control" placeholder="Your name here..." required autoFocus onChange={this.onChange}></input>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        Your name is required.
                    </Form.Control.Feedback>
                    <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Join game</button>
                    <p className="mt-5 mb-3 text-muted">Copyright &copy; 2020. All rights reserved.</p>
                </Form>
            </div>
        );
    }
}

export default Welcome;
