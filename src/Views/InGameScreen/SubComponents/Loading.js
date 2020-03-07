import React, { Component } from "react"
import Spinner from "react-bootstrap/Spinner"

class LoadingMessage extends Component {
    constructor(props) {
        super(props) // Props include the message, and the spinner.
    }

    render() {
        return (
            <div className="d-flex flex-column my-1 align-items-center justify-content-center flex-fill">
                <Spinner animation="border" />
                <div>{this.props.message}</div>
            </div>
        )
    }
}

export default LoadingMessage