import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/Form.css";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from "react-i18next";

export function MyAppointments() {
  let { userID } = useParams();
  const [userData, setUserData] = useState();
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("language");

  useEffect(() => {
    const getResult = async () => {
      // gets all appintments of user
      const token = localStorage.getItem("token");

      ApiClient.getUserInfo(token)
        .then((res) => {
          localStorage.setItem("user-info", JSON.stringify(res.data));
          setUserData(JSON.parse(localStorage.getItem("user-info")));
        })
        .catch((err) => console.log(err));
    };
    getResult();
  }, [userID]);

  const deleteEvent = async (businessID, eventID) => {
    const appointment = {
      businessID: businessID,
      eventID: eventID,
    };

    ApiClient.deleteEventFromCalender(appointment)
      .then((res) => {
        //Delete from my appointments
        const infoUser = JSON.parse(localStorage.getItem("user-info"));
        appointment.userID = infoUser._id;
        ApiClient.deleteEventFromMyAppointments(appointment)
          .then((res) => {
            window.localStorage.setItem("user-info", JSON.stringify(res.data));
            window.location.reload(false);
          })
          .catch();
      })
      .catch();
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h2>{t("MyAppointments")}</h2>
        <hr></hr>
        {userData
          ? userData.myAppointments.map((item) => {
              return (
                <div key={item.id}>
                  {currentLanguage === "he" ? (
                    <Card>
                      <Card.Header>
                        {item.name}
                        <b> :שם העסק</b>{" "}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {item.date}
                          <b> :תאריך</b>
                          <br />
                          {item.time}
                          <b> :שעה</b>
                          <br />
                        </Card.Text>
                        <Button
                          variant="btn btn-danger"
                          onClick={() => deleteEvent(item.businessID, item.id)}
                        >
                          מחק
                        </Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card>
                      <Card.Header>
                        <b>Business Name:</b> {item.name}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <b>Date: </b>
                          {item.date}
                          <br />
                          <b>Time: </b>
                          {item.time}
                          <br />
                        </Card.Text>
                        <Button
                          variant="btn btn-danger"
                          onClick={() => deleteEvent(item.businessID, item.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                  <br />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
