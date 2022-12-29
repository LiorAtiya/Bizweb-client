import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';

export default function MyAppointments() {

    const getUserData = JSON.parse(localStorage.getItem('token'));
    console.log(getUserData);

    const deleteEvent = async (id, t, name, phone, date) => {

        //Delete from calender
        await axios.delete('http://localhost:5015/api/calender/delete-event',
            { data: { businessID: id, date: date, time: t, name: name, phone: phone } })
            .then((res) => {
                if (res.status === 200) {
                    //Delete from my appointments
                    axios.delete(`http://localhost:5015/api/users/${getUserData._id}/delete-appointment`,
                        { data: { businessID: id, date: date, time: t, name: name, phone: phone } })
                        .then((res) => {
                            if (res.status !== 500) {
                                window.localStorage.setItem("token", JSON.stringify(res.data));
                                console.log("Delete appointment from list of user");
                                window.location.reload(false);
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })

    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h2>My Appointments</h2>
                <hr></hr>
                {
                    getUserData.myAppointments.map(item => {
                        return (
                            <>
                                <Card>
                                    <Card.Header><b>Business Name:</b> {item.name}</Card.Header>
                                    <Card.Body>
                                        {/* <Card.Title>Special title treatment</Card.Title> */}
                                        <Card.Text>
                                            <b>Date: </b>{item.date}
                                            <br />
                                            <b>Time: </b>{item.time}
                                            <br />
                                        </Card.Text>
                                        <Button variant="btn btn-danger"
                                            onClick={() => deleteEvent(item.businessID, item.time, item.name, item.phone, item.date)}
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
    )
}
