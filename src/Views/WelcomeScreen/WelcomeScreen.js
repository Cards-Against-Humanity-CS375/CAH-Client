import React, { Component } from "react";
import Player from '../../Models/Player';
import { Grid, TextField, Button, Box, makeStyles} from '@material-ui/core';

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
        if (name === '') {
            name = 'I forgot to put a name.';
        };
        // TODO: Figure out the id. Does it have a purpose, or do we just use socket.id from InGame Screen as the identifier?
        this.props.history.push({ // We pass the state, and can access using this.props.location.state. LOCATION is important!
            pathname: '/ingame',
            state: { current_player: new Player("123",name)}
        });


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
                {/* Make sure there is a message component below to check if there are enough players (Ex. Players needed left: 2) */}
            </Grid></Box>
        );
    }
}

export default Welcome;
