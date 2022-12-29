import React, { useState, useEffect, useRef } from 'react'
import { FaStar } from "react-icons/fa"
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import '../../styles/Reviews.css'
import * as Components from '../StyledForm'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        margin: "20px 0",
        minHeight: 100,
        padding: 10
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10
    }
}

export default function Reviews({ id }) {

    const stars = Array(5).fill(0);
    const [reviewList, setReviewList] = useState([])
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [reviewID,setReviewID] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setReviewID(id);
        setShow(true);
    }

    const name = useRef();
    const review = useRef();

    const getUserData = JSON.parse(localStorage.getItem('token'));

    const isAdmin = () => {
        if (getUserData) {
            return getUserData.business.includes(id);
        }
        return false;
    }

    useEffect(() => {
        const getResult = async () => {
            //get all images of the business from mongodb
            await axios.get(`http://localhost:5015/api/business/${id}/reviews`)
                .then((res) => setReviewList(res.data))
                .catch((err) => console.log(err));
        };
        getResult();
    }, [id]);

    //----- Stars Rating --------
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const addReview = async () => {
        const newReview = {
            details: {
                id: 'id' + (new Date()).getTime(),
                name: name.current.value,
                review: review.current.value,
                stars: currentValue
            },
            userID: id
        }
        await axios.put(`http://localhost:5015/api/business/${id}/reviews`, newReview);
        window.location.reload(false);
    }

    const removeReview = async () => {
        await axios.delete(`http://localhost:5015/api/business/${id}/reviews`,
            { data: { id: reviewID } });
        window.location.reload(false);
    }

    return (
        <div style={styles.container}>
            <Card className='card-container'>
                <Card.Header><h2>Star Rating</h2></Card.Header>
                <Card.Header>

                    <div style={styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}
                                    style={{
                                        marginRight: 10,
                                        cursor: 'pointer'
                                    }}
                                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            )
                        })}
                    </div>
                </Card.Header>

                <Card.Body>
                    <Card.Text className='card-text'>
                        <form onSubmit={addReview}>

                            <Components.Input type='text' placeholder='Your name'
                                required ref={name}
                            />

                            <Components.TextArea type='textarea' placeholder="What's your feedback"
                                required ref={review}
                            />

                            <Components.Button type="submit">Submit</Components.Button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>

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
                    <Button variant="btn btn-success" onClick={removeReview}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <div>
                <br></br>
                <h3 style={{ textAlign: "center", color: "white" }}><b>Feedbacks:</b></h3>
                {
                    reviewList.map((item, i) => {
                        return (
                            <>
                                {
                                    isAdmin() ?
                                        <Toast className='toast-box' onClose={() => {
                                            handleShow(item.id);
                                        } 
                                        }>
                                            <Toast.Header>
                                                {/* <img src="holder.js/20x20?text=/%20" className="rounded me-2" alt="" /> */}
                                                <div className="me-auto">{item.name}</div>
                                                <div className="stars">{item.stars} ⭐</div>
                                            </Toast.Header>
                                            <Toast.Body>{item.review}</Toast.Body>
                                        </Toast>
                                        :
                                        <Toast className='toast-box'>
                                            <Toast.Header closeButton={false}>
                                                {/* <img src="holder.js/20x20?text=/%20" className="rounded me-2" alt="" /> */}
                                                <strong className="me-auto">{item.name}</strong>
                                                <div className="stars">{item.stars} ⭐</div>

                                            </Toast.Header>
                                            <Toast.Body>{item.review}</Toast.Body>
                                        </Toast>
                                }
                                <br></br>
                            </>
                        )
                    })
                }
            </div>
            <br></br>
            <br></br>
        </div>
    )
}
