import React, { useState } from "react"

import Alert from 'react-bootstrap/Alert';


const MessageBox = (props) => {
    if (props.messages.length > 0) {
        if (props.show) {
            if (props.messages.includes("[SUCCESS]")) {
                return (
                    <Alert variant="success">
                        <p>{props.messages[0]}</p>
                    </Alert>
                )
            }
            else if (props.messages.includes("[ERROR]")) {
                return (
                    <Alert variant="danger">
                        <p>{props.messages[0]}</p>
                    </Alert>
                )
            }
            else {
                return (
                    <Alert variant="primary">
                        <p>{props.messages[0]}</p>
                    </Alert>
                )
            }
        }
    }

    return (<></>)
}

export default MessageBox