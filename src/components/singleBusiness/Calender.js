import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import app from '../../context/firebase_config'
import '../../styles/Calender.css'
import * as Components from '../../styles/StyledForm'

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

//Calender
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import Badge from '@mui/material/Badge';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import CheckIcon from '@mui/icons-material/Check';

//Window of client appointment
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const auth = getAuth(app)

const Calendar = ({ id, businessName }) => {
    // const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
    const [value, setValue] = useState(new Date());
    const [Flag, setFlag] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredFreeEvents, setFilteredFreeEvents] = useState([]);
    const [filteredAddHours, setFilteredAddHours] = useState([]);

    //Details of client
    const time = useRef("");
    const name = useRef("");
    // const phone = useRef("");
    const comments = useRef("");

    //============ Admin Permissions ============
    //for add hours
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //for see appoiments
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const getUserData = JSON.parse(localStorage.getItem('token'));

    const isAdmin = () => {
        if (getUserData) {
            return getUserData.business.includes(id);
        }
        return false;
    }

    // ========== OTP Verify ==================

    const otp = useRef();
    const [phone, setPhone] = useState("");
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [verifyButton, setVerifyButton] = useState(false);
    const [verified, setVerified] = useState(false);

    const changeMobile = (e) => {
        setPhone(e.target.value);
        if (phone.length === 9) {
            setVerifyButton(true);
        } else {
            setVerifyButton(false);
        }
    }

    const onCaptchVerify = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                this.onSignInSubmit();
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
        }, auth);
    }

    //send otp code to confirm number phone
    const onSignInSubmit = () => {
        onCaptchVerify();
        const phoneNumber = "+972" + phone;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("otp sended")
                setVerifyOtp(true);
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }

    const verifyCode = () => {
        window.confirmationResult.confirm(otp.current.value).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            alert("Verification Done")
            setVerified(true);
            setVerifyOtp(false);
        }).catch((error) => {
            alert("Invalid Otp")
        });
    }

    // ==================End of OTP Verify ======================

    //Filter of selected date
    const dateAppoimentsFiltered = () => {
        return events.dates.filter(event => event.date === value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear());
    }

    const hours = [
        { value: "08:00", isChecked: false },
        { value: "09:00", isChecked: false },
        { value: "10:00", isChecked: false },
        { value: "11:00", isChecked: false },
        { value: "12:00", isChecked: false },
        { value: "13:00", isChecked: false },
        { value: "14:00", isChecked: false },
        { value: "15:00", isChecked: false },
        { value: "16:00", isChecked: false },
        { value: "17:00", isChecked: false },
        { value: "18:00", isChecked: false },
        { value: "19:00", isChecked: false },
        { value: "20:00", isChecked: false },
    ]

    useEffect(() => {
        const getResult = async () => {
            //gets all events of business
            await axios.post('http://localhost:5015/api/calender/get-events', { businessID: id })
                .then((res) => setEvents(res.data))
                .catch((err) => console.log(err));
        };
        getResult();
    }, [id]);

    //Add new event to calender
    const handleClick = async (e) => {
        e.preventDefault();

        //********* RETURN THIS*************** */
        // if (verified) {

            const appointment = {
                businessName: businessName,
                businessID: id,
                busy: true,
                date: value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear(),
                time: time.current.value,
                name: name.current.value,
                phone: phone,
                comments: comments.current.value,
                userID: ""
            }

            //Add user ID to appointment
            if (getUserData) {
                appointment.userID = getUserData._id;
            }

            await axios.post('http://localhost:5015/api/calender/create-event', appointment);
            console.log("Added new event to calender");

            //if user connected => Update in the personal profile the appointment
            if (getUserData) {
                await axios.put(`http://localhost:5015/api/users/${getUserData._id}/newappointment`, appointment)
                    .then((res) => {
                        if (res.status !== 500) {
                            window.localStorage.setItem("token", JSON.stringify(res.data));
                            console.log("Added new appointment to list of user");
                            window.location.reload(false);
                        }
                    })
            }

            window.location.reload(false);
        
        //*************** RETURN THIS */
        // } else {
        //     alert("Please Verify Mobile");
        // }
    }

    //for chosen times to add
    const handleChange = (event) => {
        let isChecked = event.target.checked;
        let item = event.target.value;

        hours.map(i => {
            if (i.value === item) {
                return i.isChecked = isChecked;
            }
            return null;
        });
    }

    const addHours = async () => {
        const hourChecked = hours.filter(i => i.isChecked === true);
        hourChecked.map(async (item) => {

            const appointment = {
                businessID: id,
                busy: false,
                date: value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear(),
                time: item.value
            }

            await axios.post('http://localhost:5015/api/calender/create-event', appointment)
        })
        // alert("Added more hours to calender")
        window.location.reload(false);
    }

    const deleteEvent = async (userID, t, name, phone, date) => {
        const appointment = {
            businessID: id, 
            date: date, 
            time: t, 
            name: name, 
            phone: phone,
            userID: userID
        }
        //Delete from calender
        await axios.delete('http://localhost:5015/api/calender/delete-event',
        { data: appointment })
        .then((res) => {

            if (res.status !== 500 && res.data.userID) {
                //Delete from list of appointment of user
                axios.delete(`http://localhost:5015/api/users/${res.data.userID}/delete-appointment`,
                { data: appointment });

                console.log("Removed appointment from list of user");
                window.location.reload(false);
            }else {
                window.location.reload(false);
            }
        })
    }


    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            {/* ============== Start Calender ================== */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    // mask='____/__/__'
                    variant='static'
                    orientation='portrait'
                    value={value}
                    disablePast
                    onChange={(newValue) => {
                        setValue(newValue)

                        //========== Filter for select free hour to appointment ========
                        const filtered = events.availableHours.filter(event => event.date === newValue.getDate() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getFullYear());

                        // sort by hours
                        filtered.sort((a, b) => {
                            const nameA = a.time // ignore upper and lowercase
                            const nameB = b.time // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            // names must be equal
                            return 0;
                        });

                        //list of available hours
                        let selectFreeEvent = filtered.map((item, index) => {
                            return <option value={item.time} key={index}>{item.time}</option>
                        })
                        setFilteredFreeEvents(selectFreeEvent);

                        //========== Filter for add hours for admin ========

                        const newFiltered = Object.values(filtered).map(k => k.time);
                        const dateFiltered = events.dates.map(obj => {
                            if (obj.date === newValue.getDate() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getFullYear()) {
                                return obj.time;
                            }
                            return null;
                        })
                        const addHoursFiltered = hours.filter(hour => !newFiltered.includes(hour.value) && !dateFiltered.includes(hour.value));

                        setFilteredAddHours(addHoursFiltered);

                        //==================================================

                        setFlag(true);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                // renderDay={(day, _value, DayComponentProps) => {
                //     const isSelected =
                //         !DayComponentProps.outsideCurrentMonth &&
                //         highlightedDays.indexOf(day.getDate()) >= 0;

                //     return (
                //         <Badge
                //             key={day.toString()}
                //             overlap='circular'
                //             badgeContent={isSelected ? <CheckIcon color='red' /> : undefined}
                //         >
                //             <PickersDay {...DayComponentProps} />
                //         </Badge>
                //     );
                // }}
                />
            </LocalizationProvider>
            {/* ============== End Calender ================== */}

            {Flag ?
                <Card style={{ width: '30rem', marginLeft: "30px", display: 'flex' }}>
                    <Card.Body>
                        <div className="d-grid">
                            {
                                isAdmin() ?
                                    <>
                                        <div className='admin-container'>
                                        <Button className='btn-admin' variant="btn btn-warning" onClick={handleShow}>
                                            <b>Add available hours</b>
                                        </Button>
                                        <br></br>
                                        <Button variant="btn btn-warning" onClick={handleShow2}>
                                            <b>List of appointments</b>
                                        </Button>
                                        </div>
                                        <hr></hr>
                                    </>
                                    :
                                    null
                            }

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <h5>Select hours to make appointments</h5>
                                </Modal.Header>
                                <Modal.Body>
                                    {
                                        filteredAddHours.map(item => (
                                            <>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={item.value}
                                                        onChange={handleChange}
                                                    /> {item.value}
                                                </label>
                                                <br></br>
                                            </>
                                        ))}

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="btn btn-success" onClick={addHours}>Confirm</Button>
                                </Modal.Footer>
                            </Modal>
                            
                            <Modal
                                show={show2}
                                onHide={handleClose2}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <h5>List of appointments</h5>
                                </Modal.Header>
                                <Modal.Body>
                                    {
                                        dateAppoimentsFiltered().map(item => {
                                            return (
                                                <>
                                                    <Card>
                                                        <Card.Header><b>Time:</b> {item.time}</Card.Header>
                                                        <Card.Body>
                                                            {/* <Card.Title>Special title treatment</Card.Title> */}
                                                            <Card.Text>
                                                                <b>Name: </b>{item.name}
                                                                <br />
                                                                <b>Phone: </b>{item.phone}
                                                                <br />
                                                                <b>Comments: </b>{item.comments}
                                                                <br />
                                                            </Card.Text>
                                                            <Button variant="btn btn-danger"
                                                                onClick={() => deleteEvent(item.userID, item.time, item.name, item.phone, value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear())}>Delete</Button>
                                                        </Card.Body>
                                                    </Card>
                                                    <br />
                                                </>
                                            )
                                        })
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                        <h1 className='header-appointment'><b>Make appointment</b></h1>
                        <Card.Subtitle className="mb-2 text-muted">{value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()}</Card.Subtitle>
                        <Card.Text>
                            {filteredFreeEvents.length !== 0 ?
                                <form onSubmit={handleClick}>
                                    <div id="recaptcha-container"></div>

                                    <div className="mb-3">
                                        <label>
                                            <b>Choose an available time:</b><br />
                                            <Components.SelectOfTime ref={time}>
                                                {filteredFreeEvents
                                                    // filteredFreeEvents :
                                                    // <option value={0} key={0}>No available hours on this day</option>
                                                }
                                            </Components.SelectOfTime>
                                        </label>
                                    </div>

                                    <Components.Input type='text' placeholder='Client name'
                                        required ref={name}
                                    />

                                    <div>
                                        <Components.Input type='number' placeholder='Phone'
                                            required
                                            onChange={(e) => changeMobile(e)}
                                        />
                                        {verifyButton ?
                                            <Components.Button
                                                type="button"
                                                onClick={onSignInSubmit}
                                            >
                                                {verified ? "Verified" : "Verify"}
                                            </Components.Button>
                                            : null}
                                    </div>

                                    {verifyOtp ?
                                        <>
                                            <Components.Input
                                                type="number"
                                                placeholder="Enter OTP"
                                                ref={otp}
                                            />
                                            <Components.Button
                                                type="button"
                                                value="OTP"
                                                onClick={verifyCode}
                                            >
                                                Confirm
                                            </Components.Button>
                                        </>
                                        :
                                        null}

                                    <Components.TextArea type='textarea' placeholder='Additional Comments'
                                        required ref={comments}
                                    />

                                    <Components.Button type="submit">Submit</Components.Button>

                                </form>
                                :
                                <h3>No available hours on this day</h3>
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
                : null}
        </div >
    );
};

export default Calendar;