import React, { Component } from "react"
import Spinner from "react-bootstrap/Spinner"
import Alert from "react-bootstrap/Alert"

class Loading extends Component {
    constructor(props) {
        super(props) // Props include the message, and the spinner.
    }

    render() {
        return (
            <div className="d-flex flex-column my-1 align-items-center justify-content-center flex-fill">
                <Spinner animation="border" />
                <div className="mt-3" >
                    <Alert variant="info">
                        {this.props.message}
                    </Alert>
                </div>
            </div>
        )
    }
}

export default Loading