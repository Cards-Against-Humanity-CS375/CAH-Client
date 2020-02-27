import React, { useState } from "react"
import ProgressBar from 'react-bootstrap/ProgressBar';

const TimerProgressBar = (props) => {
    return (
        <ProgressBar striped animated now={props.progress} />
    )
}

export default TimerProgressBar