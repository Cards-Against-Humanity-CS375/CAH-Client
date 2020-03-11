import React, { useState } from "react"

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const NavBar = (props) => {
    const playerNameItems = props.players.map((player) =>
        <a className="p-2 text-muted" href="#">{player.name}</a>
    )
    // TODO: Find new relevant emojis 
    return (
        <>
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <Button variant="outline-secondary"> 
                            <div>My score:</div>
                            <Image src="./assets/crown.svg" fluid/>
                            <Badge variant="warning" className="mx-1">{props.points}</Badge>
                        </Button>
                    </div>
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="#">CAH</a>
                    </div>
                    <div className="col-4 pt-1 d-flex justify-content-end align-items-center">
                        <Button variant="outline-secondary">
                            <div> Players</div>
                            <Image src="./assets/pug.svg" fluid />
                            <Badge variant="primary" className="mx-1">{props.players.length}</Badge>
                        </Button>
                    </div>
                </div>
            </header>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {playerNameItems}
                </nav>
            </div>
        </>
    )
}

export default NavBar