import React, { useState, useRef, useEffect } from "react";
import ApiClient from "../../api/ApiRoutes";
import { sendOTP, verifyOTP } from "../../api/firebase";

//Calender
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import * as Components from "../../styles/StyledForm";
import { useTranslation } from "react-i18next";

//Day marked
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

//Window of client appointment
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../../styles/Calender.css";

const Calendar = ({ businessId, businessName }) => {
  const [highlightedDays, setHighlightedDays] = useState([]);

  const [value, setValue] = useState(new Date());
  const [valueTime, setValueTime] = useState(dayjs("2022-04-07"));
  const [Flag, setFlag] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredFreeEvents, setFilteredFreeEvents] = useState([]);

  const { t, i18n } = useTranslation();

  //Details of client
  const [time, setTime] = useState("");
  const name = useRef("");
  const comments = useRef("");

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
  };

  useEffect(() => {
    const getResult = async () => {
      //Remove expired event
      ApiClient.removeExpiredEvents(businessId).then().catch();

      //gets all events of business
      ApiClient.getAllEventsOfCalender(businessId)
        .then((res) => {
          setEvents(res.data);
          const dateMaped = res.data.availableHours.map((obj) => obj.date);
          setHighlightedDays(dateMaped);
        })
        .catch();
    };
    getResult();
  }, [businessId]);

  //============ Admin Permissions ============
  //for add hours
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // window.location.reload(false);
  };
  const handleShow = () => setShow(true);
  //for see appoiments
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const getUserData = JSON.parse(localStorage.getItem("user-info"));

  const isAdmin = () => {
    if (getUserData) {
      return getUserData.business.includes(businessId);
    }
    return false;
  };

  //Filter of selected date
  const dateAppoimentsFiltered = () => {
    return events.dates.filter(
      (event) =>
        event.date ===
        value.getDate() +
          "/" +
          (value.getMonth() + 1) +
          "/" +
          value.getFullYear()
    );
  };

  //Add new event to calender (A client has made an appointment)
  const addNewEvent = async (e) => {
    e.preventDefault();

    if (verified) {
      const date =
        value.getDate() +
        "/" +
        (value.getMonth() + 1) +
        "/" +
        value.getFullYear();
      const expiredDate = parseInt(
        date.split("/").reduce(function (first, second) {
          return second + first;
        }, "")
      );

      //Parse time to int
      const expiredTime =
        time.split(":").reduce(function (seconds, v) {
          return +v + seconds * 60;
        }, 0) / 60;

      const appointment = {
        id: "id" + new Date().getTime(),
        businessID: businessId,
        date: date,
        time: time,
        name: name.current.value,
        phone: phone,
        comments: comments.current.value,
        expiredTime: expiredTime,
        expiredDate: expiredDate,
      };

      //Add user ID to appointment
      if (getUserData) {
        appointment.userID = getUserData._id;
      }

      ApiClient.addNewEvent(appointment)
        .then((res) => {
          //if user login => Update in the personal profile the appointment
          if (getUserData) {
            ApiClient.updateEventInMyAppointment(getUserData._id, appointment)
              .then((res) => {
                window.localStorage.setItem(
                  "user-info",
                  JSON.stringify(res.data)
                );
              })
              .catch();
          }

          alert(t("ConfirmAppointment"));
          window.location.reload(false);
        })
        .catch();
    } else {
      alert(t("PleaseVerifyMobile"));
    }
  };

  const addHours = async () => {
    let min, hours, parseTime;
    if (valueTime.$d.getHours() < 10) {
      hours = "0" + valueTime.$d.getHours();
    } else {
      hours = valueTime.$d.getHours();
    }
    if (valueTime.$d.getMinutes() < 10) {
      min = "0" + valueTime.$d.getMinutes();
    } else {
      min = valueTime.$d.getMinutes();
    }
    parseTime = hours + ":" + min;

    const date =
      value.getDate() +
      "/" +
      (value.getMonth() + 1) +
      "/" +
      value.getFullYear();
    //Parse date to int
    const expiredDate = parseInt(
      date.split("/").reduce(function (first, second) {
        return second + first;
      }, "")
    );

    //Parse time to int
    const expiredTime =
      parseTime.split(":").reduce(function (seconds, v) {
        return +v + seconds * 60;
      }, 0) / 60;

    const appointment = {
      businessID: businessId,
      date: date,
      time: parseTime,
      expiredTime: expiredTime,
      expiredDate: expiredDate,
    };

    ApiClient.addAvailableHour(appointment)
      .then((res) => {
        alert("Added new hour to appointment");
        let FreeEvent = [appointment].map((item) => {
          return (
            <div className="btnHours" onClick={() => setTime(item.time)}>
              {item.time}
            </div>
          );
        });
        setFilteredFreeEvents((oldArray) => [...oldArray, FreeEvent]);
      })
      .catch();
  };

  const deleteEvent = async (userID, t, name, phone, date) => {
    const appointment = {
      businessID: businessId,
      date: date,
      time: t,
      name: name,
      phone: phone,
      userID: userID,
    };

    //Delete from calender
    ApiClient.deleteEventFromCalender(appointment)
      .then((res) => {
        //Delete from list of appointment of user
        ApiClient.deleteEventFromMyAppointments(appointment)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="calender-page">
      <div className="calender-container">
        {/* ============== Calender component ================== */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            sx={{
              color: "white",
              background: "linear-gradient(to right, #ff4b2b, #ff416c)",
              "& .MuiPickersToolbar-penIconButton": {
                display: "none",
              },
              "& .css-1hbyad5-MuiTypography-root": {
                display: "none",
              },
              "& .css-hlj6pa-MuiDialogActions-root": {
                display: "none !important;",
              },
            }}
            // mask='____/__/__'
            variant="static"
            orientation="portrait"
            value={value}
            disablePast
            onChange={(newValue) => {
              setValue(newValue);

              //========== Filter for select free hour to appointment ========
              const filtered = events.availableHours.filter(
                (event) =>
                  event.date ===
                  newValue.getDate() +
                    "/" +
                    (newValue.getMonth() + 1) +
                    "/" +
                    newValue.getFullYear()
              );

              // sort by hours
              filtered.sort((a, b) => {
                const nameA = a.time; // ignore upper and lowercase
                const nameB = b.time; // ignore upper and lowercase
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
                return (
                  <div className="btnHours" onClick={() => setTime(item.time)}>
                    {item.time}
                  </div>
                );
              });
              setFilteredFreeEvents(selectFreeEvent);

              setFlag(true);
            }}
            renderInput={(params) => <TextField {...params} />}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.includes(
                  day.getDate() +
                    "/" +
                    (day.getMonth() + 1) +
                    "/" +
                    day.getFullYear()
                );

              return (
                <Badge
                  key={day.toString()}
                  overlap="circular"
                  badgeContent={isSelected ? "🟢" : undefined}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
        </LocalizationProvider>
        {/* ============== End Calender ================== */}

        {/* ============== Form of window make appointment ================== */}
        {Flag ? (
          <Card className="calender-card">
            <Card.Body>
              <div className="d-grid">
                {isAdmin() ? (
                  <>
                    <div className="admin-container">
                      <Button
                        className="btn-admin"
                        variant="btn btn-warning"
                        onClick={handleShow}
                      >
                        <b>{t("AddHours")}</b>
                      </Button>
                      <br></br>
                      <Button variant="btn btn-warning" onClick={handleShow2}>
                        <b>{t("ListAppointments")}</b>
                      </Button>
                    </div>
                    <hr></hr>
                  </>
                ) : null}

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header className="m-auto">
                    <h5>{t("AddHours")}</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticTimePicker
                        sx={{
                          "& .css-z3au5x-MuiButtonBase-root-MuiIconButton-root-MuiPickersToolbar-penIconButton":
                            {
                              display: "none",
                            },
                        }}
                        // ampm
                        orientation="landscape"
                        openTo="minutes"
                        value={valueTime}
                        onChange={(newValue) => {
                          setValueTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      {t("Close")}
                    </Button>
                    <Button variant="btn btn-success" onClick={addHours}>
                      {t("Confirm")}
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header className="m-auto">
                    <h5 className={"m-auto"}>{t("ListAppointments")}</h5>
                  </Modal.Header>
                  <Modal.Body>
                    {dateAppoimentsFiltered().map((item) => {
                      return (
                        <>
                          {i18n.language === "he" ? (
                            <Card>
                              <Card.Header className="text-right">
                                {item.time} <b>{t("Time")}</b>
                              </Card.Header>
                              <Card.Body className="flex justify-between">
                                <div className="flex items-center">
                                  <Button
                                    variant="btn btn-danger"
                                    className="h-[50%]"
                                    onClick={() =>
                                      deleteEvent(
                                        item.userID,
                                        item.time,
                                        item.name,
                                        item.phone,
                                        value.getDate() +
                                          "/" +
                                          (value.getMonth() + 1) +
                                          "/" +
                                          value.getFullYear()
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>

                                <Card.Text className="text-right">
                                  <b>{t("ClientName")}: </b>
                                  {item.name}
                                  <br />
                                  <b>{t("Phone")}:</b> {item.phone}
                                  <br />
                                  <b>{t("Comments")}:</b> {item.comments}
                                  <br />
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          ) : (
                            <Card>
                              <Card.Header>
                                <b>Time:</b> {item.time}
                              </Card.Header>
                              <Card.Body className="flex justify-between">
                                <Card.Text>
                                  <b>Name: </b>
                                  {item.name}
                                  <br />
                                  <b>Phone: </b>
                                  {item.phone}
                                  <br />
                                  <b>Comments: </b>
                                  {item.comments}
                                  <br />
                                </Card.Text>
                                <div className="flex items-center">
                                  <Button
                                    variant="btn btn-danger"
                                    className="h-[50%]"
                                    onClick={() =>
                                      deleteEvent(
                                        item.userID,
                                        item.time,
                                        item.name,
                                        item.phone,
                                        value.getDate() +
                                          "/" +
                                          (value.getMonth() + 1) +
                                          "/" +
                                          value.getFullYear()
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          )}
                          <br />
                        </>
                      );
                    })}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      {t("Close")}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <Card.Text className="card-body-calender">
                {filteredFreeEvents.length !== 0 ? (
                  <form>
                    <div id="recaptcha-container"></div>
                    <h4 className="header-appointment">
                      <b>{t("MakeAppointment")}</b>
                    </h4>
                    <div>
                      <Card.Subtitle className="mb-2 text-muted">
                        {value.getDate() +
                          "/" +
                          (value.getMonth() + 1) +
                          "/" +
                          value.getFullYear()}
                      </Card.Subtitle>
                      <label>
                        <b>{t("ChooseTime")}</b>
                        <br />
                        <div className="grid-container">
                          {filteredFreeEvents}
                        </div>
                        {/* <Components.SelectOfTime ref={time}> */}
                        <h6>
                          {time
                            ? i18n.language === "he"
                              ? time + t("Chosen")
                              : t("Chosen") + time
                            : null}
                        </h6>
                        {/* </Components.SelectOfTime> */}
                      </label>
                    </div>

                    <Components.AppointmentInput
                      type="text"
                      className={i18n.language ? "text-right" : null}
                      placeholder={t("ClientName")}
                      required
                      ref={name}
                    />

                    <div>
                      <Components.AppointmentInput
                        type="number"
                        className={i18n.language ? "text-right" : null}
                        placeholder={t("Phone")}
                        required
                        onChange={(e) => changeMobile(e)}
                        // style={{ width: '350px', marginLeft: '-57px' }}
                      />
                      {verifyButton ? (
                        <Components.Button
                          type="button"
                          onClick={() => sendOTP(setVerifyOtp, phone)}
                        >
                          {verified ? t("Verified") : t("Verify")}
                        </Components.Button>
                      ) : null}
                    </div>

                    {verifyOtp ? (
                      <>
                        <Components.AppointmentInput
                          type="number"
                          placeholder={t("EnterOTP")}
                          ref={otp}
                        />
                        <Components.Button
                          type="button"
                          value="OTP"
                          onClick={() =>
                            verifyOTP(setVerifyOtp, setVerified, otp)
                          }
                        >
                          {t("Confirm")}
                        </Components.Button>
                      </>
                    ) : null}

                    <Components.AppointmentTextArea
                      type="textarea"
                      className={i18n.language ? "text-right" : null}
                      placeholder={t("AdditionalComments")}
                      required
                      ref={comments}
                    />

                    <Components.Button onClick={addNewEvent}>
                      {t("Submit")}
                    </Components.Button>
                  </form>
                ) : (
                  <h3>{t("NoAvailable")}</h3>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : null}

        {/* ============== End of form of window make appointment ================== */}
      </div>
    </div>
  );
};

export default Calendar;
