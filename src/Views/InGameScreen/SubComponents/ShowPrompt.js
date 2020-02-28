import React, { useState } from "react"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const ShowPrompt = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="pb-3">
                <Button variant="dark" onClick={handleShow}>
                    Show black card
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Card className="box-shadow h-md-250" border="dark" bg="dark" text="white" style={{ height: '28rem' }}>
                    <Card.Body className="d-flex flex-column align-items-start">
                        <Card.Text>
                            {props.blackCard}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted" >
                        <div className="row flex-nowrap justify-content-between align-items-center">
                            <div className="col-8 pt-1">
                                <Image src="./assets/cah.svg" width="20" height="20" />
                                Cards Against Humanity
                  </div>
                            <div className="col-4 pt-1 d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                    </Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Modal>
        </>
    );
}

export default ShowPrompt