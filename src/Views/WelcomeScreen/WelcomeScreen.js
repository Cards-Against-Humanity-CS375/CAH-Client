import React, { Component } from "react";
import { Router, route } from "react-router";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link, withRouter } from "react-router-dom";
import Player from '../../Models/Player';
import { Grid, TextField, Button, Box, makeStyles, Container } from '@material-ui/core';
import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
    textWelcome: {
        margin: theme.spacing(8),
    },
}))

class Welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
    }

    onChange = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    onSubmit = () => {
        let name = this.state.name;
        if (name == '') {
            name = 'I forgot to put a name.';
        };
        // <switch>
        //     <Route exact path="/ingame" component={InGameScreen} />
        // </switch>
        // props.history.push("/ingame");
        // TODO: Figure out the id. Does it have a purpose, or do we just use socket.id from InGame Screen as the identifier?
        this.props.history.push({
            pathname: '/ingame',
            state: { current_player: new Player("123",name)}
        });
        // this.props.navigation.navigate('/ingame')
        // this.props.socket.emit('message', {
        //     type: "NEW_USER",
        //     content: name
        // });


    }

    render() {
        // const classes = useStyles();
        return (
            <Box my="auto"><Grid container direction="column" alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item><Box component="h3" m={1}>Cards Against Humanity</Box></Grid>
                <Grid item><Box mx="auto" m={1}><TextField variant="outlined" name="inpName" id="inpName" label="Please enter a name" onChange={this.onChange} ></TextField></Box></Grid>
                <Grid item><Button variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button></Grid>
            </Grid></Box>
        );
    }
}

export default withRouter(Welcome);
