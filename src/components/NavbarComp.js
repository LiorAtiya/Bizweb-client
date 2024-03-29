import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Navbar.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../translations/LanguageSwitcher";
import { BusinessContext } from "../context/BusinessContext";

export default function NavbarComp() {

  const { getUserInfo } = useContext(BusinessContext);
  const getUserData = getUserInfo();

  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-info");
    window.location.reload(false);
  };

  return (
    <div>
      <Navbar
        className="NavbarItems"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container className="container-navbar">
          <Navbar.Brand className="logo" as={Link} to={"/"}>
            <b>Bizweb</b>
            <i className="fa-solid fa-briefcase"></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to={"/login"}>About us</Nav.Link> */}
            </Nav>
            <Nav className="nav-links">
              <Nav.Link
                className="QuichAppointment"
                as={Link}
                to={"/quickappointment"}
              >
                <b>{t("QuickAppointment")}</b>
              </Nav.Link>
              <div className="hello-user">
                <i className="fa-solid fa fa-user"></i>
                <NavDropdown
                  title={
                    getUserData
                      ? i18n.language === "he"
                        ? `${getUserData.firstname} ${t("Hello")} `
                        : `${t("Hello")} ${getUserData.firstname}`
                      : t("HelloGuest")
                  }
                  id="collasible-nav-dropdown"
                >
                  {getUserData ? (
                    <>
                      <NavDropdown.Item as={Link} to={`/myappointments`}>
                        {t("MyAppointments")}
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={`/myshoppingcart`}>
                        {t("MyShoppingCart")}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to={`/mybusiness`}>
                        {t("MyBusiness")}
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/newbusiness"}>
                        {t("OpenNewBussiness")}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleShow}>
                        {t("Logout")}
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item as={Link} to={"/login"}>
                        {t("LoginOrRegister")}
                      </NavDropdown.Item>
                      {/* <NavDropdown.Item as={Link} to={"/register"}>Register</NavDropdown.Item> */}
                    </>
                  )}
                </NavDropdown>
              </div>
              <Nav.Link>
                <b>
                  <LanguageSwitcher />
                </b>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>{t("AreUSure")}</h5>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("No")}
          </Button>
          <Button variant="btn btn-success" onClick={logOut}>
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
