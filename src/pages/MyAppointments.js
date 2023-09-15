import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/Form.css";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from "react-i18next";

export default function MyAppointments() {
  let { userID } = useParams();
  const [userData, setUserData] = useState();
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("language");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getResult = async () => {
      // gets all appintments of user

      if (token) {
        ApiClient.getUserInfo(token)
          .then((res) => {
            localStorage.setItem("user-info", JSON.stringify(res.data));
            setUserData(JSON.parse(localStorage.getItem("user-info")));
          })
          .catch();
      }
    };
    getResult();
  }, [userID]);

  const deleteEvent = async (businessID, eventID) => {
    const appointment = {
      businessID: businessID,
      eventID: eventID,
    };
    
    ApiClient.deleteEventFromCalender(token, appointment)
      .then((res) => {
        //Delete from my appointments
        ApiClient.deleteEventFromMyAppointments(token, appointment)
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
                        {item.businessName}
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
                          onClick={() => deleteEvent(item.businessID, item.eventID)}
                        >
                          מחק
                        </Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card>
                      <Card.Header>
                        <b>Business Name:</b> {item.businessName}
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
                          onClick={() => deleteEvent(item.businessID, item.eventID)}
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
