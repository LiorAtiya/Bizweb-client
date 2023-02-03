import React, { useState, useContext } from 'react'
import '../styles/Form.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BusinessContext } from '../context/BusinessContext'
import Modal from 'react-bootstrap/Modal';
import ApiClient from '../api/ApiRoutes';
import { Link } from "react-router-dom";

export default function MyBusiness() {

    const context = useContext(BusinessContext)
    const { getAllBusinessOfUser } = context;

    const getUserData = JSON.parse(localStorage.getItem('token'));
    const allBusiness = getAllBusinessOfUser(getUserData.business);

    const [businessToDelete, setBusinessToDelete] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (businessID) => {
        setShow(true);
        setBusinessToDelete(businessID)
    }
    const deleteBusiness = () => {

        ApiClient.deleteBusiness(getUserData._id, businessToDelete)
            .then((res) => {
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h2>My Business</h2>
                    <hr></hr>
                    {
                        allBusiness.map(item => {
                            return (
                                <>
                                    <Card>
                                        <Card.Header><b>Business Name:</b> {item.name}</Card.Header>
                                        <Card.Body>
                                            <Button variant="btn btn-warning" style={{ margin: "10px" } } as={Link} to={`/editbusiness/${item.name}`}
                                            >Edit</Button>
                                            <Button variant="btn btn-danger"
                                                onClick={() => handleShow(item._id)}
                                            >Delete</Button>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </>
                            )
                        })
                    }
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h5>Are you sure you want to delete?</h5>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="btn btn-success" onClick={() => deleteBusiness()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
