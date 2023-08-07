import React, { useState, useContext, useEffect } from "react";
import "../styles/Form.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BusinessContext } from "../context/BusinessContext";
import Modal from "react-bootstrap/Modal";
import ApiClient from "../api/ApiRoutes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function MyBusiness() {
  const currentLanguage = localStorage.getItem("language");
  const token = localStorage.getItem("token");

  const context = useContext(BusinessContext);
  const { getAllBusinessOfUser } = context;
  const { t } = useTranslation();

  const [allBusiness, setAllBusiness] = useState([]);
  const [businessToDelete, setBusinessToDelete] = useState("");

  useEffect(() => {
    const getResult = async () => {
      // gets all appintments of user
      const token = localStorage.getItem("token");

      ApiClient.getUserInfo(token)
        .then((res) => {
          localStorage.setItem("user-info", JSON.stringify(res.data));

          setAllBusiness(getAllBusinessOfUser(res.data.business));
        })
        .catch((err) => console.log(err));
    };
    getResult();
  }, [getAllBusinessOfUser]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (businessID) => {
    setShow(true);
    setBusinessToDelete(businessID);
  };
  const deleteBusiness = () => {
    ApiClient.deleteBusiness(token, businessToDelete)
      .then((res) => {
        window.location.reload(false);
      })
      .catch();
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h2>{t("MyBusiness")}</h2>
          <hr></hr>
          {allBusiness?.map((item, i) => {
            return currentLanguage === "he" ? (
              <div key={i}>
                <Card>
                  <Link
                    to={`/${item.category}/${item.name}`}
                    className="text-black no-underline"
                  >
                    <Card.Header>
                      {item.name} <b> :שם העסק</b>
                    </Card.Header>
                  </Link>
                  <Card.Body>
                    <Button
                      variant="btn btn-warning"
                      style={{ margin: "10px" }}
                      as={Link}
                      to={`/editbusiness/${item.name}`}
                    >
                      עריכה
                    </Button>
                    <Button
                      variant="btn btn-danger"
                      onClick={() => handleShow(item._id)}
                    >
                      מחיקה
                    </Button>
                  </Card.Body>
                </Card>
                <br />
              </div>
            ) : (
              <div key={i}>
                <Card>
                  <Link
                    to={`/${item.category}/${item.name}`}
                    className="text-black no-underline"
                  >
                    <Card.Header>
                      <b>Business Name:</b> {item.name}
                    </Card.Header>
                  </Link>
                  <Card.Body>
                    <Button
                      variant="btn btn-warning"
                      style={{ margin: "10px" }}
                      as={Link}
                      to={`/editbusiness/${item.name}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="btn btn-danger"
                      onClick={() => handleShow(item._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
                <br />
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>{t("WantToDelete")}</h5>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("No")}
          </Button>
          <Button variant="btn btn-success" onClick={() => deleteBusiness()}>
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
