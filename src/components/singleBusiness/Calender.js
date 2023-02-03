import React, { useState, useRef, useEffect } from 'react';
import app from '../../api/firebase_config'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import ApiClient from '../../api/ApiRoutes';

//Calender
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs';
import * as Components from '../../styles/StyledForm'

//Day marked
// import TextField from '@mui/material/TextField';
// import CheckIcon from '@mui/icons-material/Check';
// import Badge from '@mui/material/Badge';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';

//Window of client appointment
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../../styles/Calender.css'

const auth = getAuth(app)

const Calendar = ({ id, businessName }) => {
    // const [highlightedDays, setHighlightedDays] = useState([]);

    const [value, setValue] = useState(new Date());
    const [valueTime, setValueTime] = useState(dayjs('2022-04-07'));
    const [Flag, setFlag] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredFreeEvents, setFilteredFreeEvents] = useState([]);

    //Details of client
    const [time, setTime] = useState("");
    const name = useRef("");
    const comments = useRef("");

    useEffect(() => {
        const getResult = async () => {

            //Remove expired event
            ApiClient.removeExpiredEvents(id)
                .then()
                .catch((err) => console.log(err))

            //gets all events of business
            ApiClient.getAllEventsOfCalender(id)
                .then((res) => {
                    setEvents(res.data)

                })
                .catch((err) => console.log(err));
        };
        getResult();
    }, [id]);

    //============ Admin Permissions ============
    //for add hours
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // window.location.reload(false);
    }
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

    // ================== OTP Verify ======================

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
            // const user = result.user;
            // console.log(user);
            alert("Verification Done")
            setVerified(true);
            setVerifyOtp(false);
        }).catch((error) => {
            alert("Invalid Otp")
        });
    }

    // ================== End of OTP Verify ======================

    //Filter of selected date
    const dateAppoimentsFiltered = () => {
        return events.dates.filter(event => event.date === value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear());
    }

    //Add new event to calender (A client has made an appointment)
    const handleClick = async (e) => {
        e.preventDefault();

        if (verified) {

            const date = value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
            const expiredDate = parseInt(date.split('/').reduce(function (first, second) {
                return second + first;
            }, ""));

            //Parse time to int
            const expiredTime = time.split(':').reduce(function (seconds, v) {
                return + v + seconds * 60;
            }, 0) / 60;

            const appointment = {
                businessName: businessName,
                businessID: id,
                busy: true,
                date: date,
                time: time,
                name: name.current.value,
                phone: phone,
                comments: comments.current.value,
                userID: "",
                expiredTime: expiredTime,
                expiredDate: expiredDate
            }

            //Add user ID to appointment
            if (getUserData) {
                appointment.userID = getUserData._id;
            }

            ApiClient.addNewEvent(appointment)
                // await axios.post('https://facework-server-production.up.railway.app/api/calender/create-event', appointment)
                .then(res => console.log("Added new event to calender"))
                .catch((err) => console.log(err));

            //if user connected => Update in the personal profile the appointment
            if (getUserData) {
                ApiClient.updateEventInMyAppointment(getUserData._id, appointment)
                    // await axios.put(`https://facework-server-production.up.railway.app/api/users/${getUserData._id}/newappointment`, appointment)
                    .then((res) => {
                        if (res.status !== 500) {
                            window.localStorage.setItem("token", JSON.stringify(res.data));
                            // console.log("Added new appointment to list of user");
                        }
                    })
                    .catch((err) => console.log(err));
            }

            // //Reset value after make an appointment
            // const removeFreeEvent = filteredFreeEvents.filter(item => {
            //     return item.props.children !== time
            // })
            // setFilteredFreeEvents(removeFreeEvent);
            // name.current.value = ""
            // comments.current.value = ""
            // setTime("")
            // setPhone("")
            alert('A new appointment is scheduled, you will be notified about the appointment details');
            window.location.reload(false);

        } else {
            alert("Please Verify Mobile");
        }
    }

    const addHours = async () => {

        let min, hours, parseTime;
        if ((valueTime.$d.getHours()) < 10) {
            hours = '0' + (valueTime.$d.getHours())
        } else {
            hours = (valueTime.$d.getHours())
        }
        if (valueTime.$d.getMinutes() < 10) {
            min = '0' + valueTime.$d.getMinutes()
        } else {
            min = valueTime.$d.getMinutes()
        }
        parseTime = hours + ":" + min;

        const date = value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
        //Parse date to int
        const expiredDate = parseInt(date.split('/').reduce(function (first, second) {
            return second + first;
        }, ""));

        //Parse time to int
        const expiredTime = parseTime.split(':').reduce(function (seconds, v) {
            return + v + seconds * 60;
        }, 0) / 60;

        const appointment = {
            businessID: id,
            date: date,
            time: parseTime,
            expiredTime: expiredTime,
            expiredDate: expiredDate
        }

        ApiClient.addAvailableHour(appointment)
            // await axios.post('https://facework-server-production.up.railway.app/api/calender/create-event', appointment)
            .then(res => {
                alert('Added new hour to appointment')
                let FreeEvent = [appointment].map((item) => {
                    return <div className='btnHours' onClick={() => setTime(item.time)}>{item.time}</div>
                })
                setFilteredFreeEvents(oldArray => [...oldArray, FreeEvent])
                // console.log(filteredFreeEvents);
            })
            .catch((err) => console.log(err));

        // })
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
        ApiClient.deleteEventFromCalender(appointment)
            // await axios.delete('https://facework-server-production.up.railway.app/api/calender/delete-event',{ data: appointment })
            .then((res) => {
                //Delete from list of appointment of user
                // axios.delete(`https://facework-server-production.up.railway.app/api/users/${res.data.userID}/delete-appointment`,{ data: appointment });
                ApiClient.deleteEventFromMyAppointments(appointment)
                    .then((res) => {
                        console.log("Delete appointment from list of user")
                        window.location.reload(false);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            {/* ============== Calender component ================== */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    sx={{
                        color: 'white',
                        background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
                        '& .MuiPickersToolbar-penIconButton': {
                            display: 'none',
                        },
                        '& .css-1hbyad5-MuiTypography-root': {
                            display: 'none',
                        },
                        '& .css-hlj6pa-MuiDialogActions-root': {
                            display: 'none !important;',
                        },
                    }}
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
                            return <div className='btnHours' onClick={() => setTime(item.time)}>{item.time}</div>
                        })
                        setFilteredFreeEvents(selectFreeEvent);

                        setFlag(true);
                    }}

                // renderInput={(params) => <TextField {...params} />}

                // renderDay={(day, highlightedDays, DayComponentProps) => {
                //     const isSelected = 
                //         !DayComponentProps.outsideCurrentMonth &&
                //         highlightedDays.find((d) => d.getDate() === day.getDate());

                //         console.log(isSelected)
                //     return (
                //         <Badge
                //             key={day.toString()}
                //             overlap='circular'
                //             badgeContent={isSelected ? '🟢' : null}
                //         >
                //             <PickersDay {...DayComponentProps} />
                //         </Badge>
                //     );
                // }}
                />
            </LocalizationProvider>
            {/* ============== End Calender ================== */}

            {/* ============== Form of window make appointment ================== */}
            {Flag ?
                <Card style={{ width: '29rem', marginLeft: "30px", display: 'flex' }}>
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticTimePicker
                                            sx={{
                                                '& .css-z3au5x-MuiButtonBase-root-MuiIconButton-root-MuiPickersToolbar-penIconButton': {
                                                    display: 'none',
                                                },
                                            }}
                                            // ampm
                                            orientation="landscape"
                                            openTo="minutes"
                                            value={valueTime}
                                            onChange={(newValue) => {
                                                setValueTime(newValue)
                                            }}
                                        // renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
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
                        <Card.Text>
                            {filteredFreeEvents.length !== 0 ?
                                <form>
                                    <div id="recaptcha-container"></div>
                                    <h1 className='header-appointment' style={{ width: '400px', marginLeft: '-80px' }}><b>Make appointment</b></h1>
                                    <div style={{ width: '350px', marginLeft: '-57px' }}>
                                        <Card.Subtitle className="mb-2 text-muted">{value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()}</Card.Subtitle>
                                        <label>
                                            <b>Choose an available time:</b><br />
                                            <div className='grid-container'>
                                                {filteredFreeEvents}
                                            </div>
                                            {/* <Components.SelectOfTime ref={time}> */}
                                            <h6>{time ? "Chosen: " + time : null}</h6>
                                            {/* </Components.SelectOfTime> */}
                                        </label>
                                    </div>

                                    <Components.Input type='text' placeholder='Client name'
                                        required ref={name}
                                        style={{ width: '350px', marginLeft: '-57px' }}
                                    />

                                    <div>
                                        <Components.Input type='number' placeholder='Phone'
                                            required
                                            onChange={(e) => changeMobile(e)}
                                            style={{ width: '350px', marginLeft: '-57px' }}
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
                                                style={{ width: '350px', marginLeft: '-57px' }}
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
                                        style={{ width: '350px', marginLeft: '-57px' }}
                                    />

                                    <Components.Button onClick={handleClick}>Submit</Components.Button>

                                </form>
                                :
                                <h3>No available hours on this day</h3>
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
                : null}

            {/* ============== End of form of window make appointment ================== */}
        </div >
    );
};

export default Calendar;