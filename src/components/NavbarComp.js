import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/Navbar.css";
// import { useHistory } from "react-router-dom";
// import { AuthContext } from '../context/AuthContext';

export default function NavbarComp() {

  // const {user} = useContext(AuthContext)
  // let history = useHistory();

  const getUserData = JSON.parse(localStorage.getItem('token'));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
    localStorage.removeItem('token');
    // history.push('/');
    window.location.reload(false);
  }

  return (
    <div>
      <Navbar className='NavbarItems' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className='logo' as={Link} to={"/"}><b>Facework</b>
          <i className='fa-solid fa-briefcase'></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to={"/login"}>About us</Nav.Link> */}
            </Nav>
            <Nav className='nav-links'>
              <Nav.Link className='QuichAppointment' as={Link} to={"/quickappointment"}><b>Quick Appointment</b></Nav.Link>
              <i className='fa-solid fa fa-user'></i>
              <NavDropdown title={getUserData ? `Hello ${getUserData.firstname}` : "Hello Guest"} id="collasible-nav-dropdown">
                {
                  getUserData ? (
                    <>
                      <NavDropdown.Item as={Link} to={`/myappointments/${getUserData._id}`}>
                        My appointments
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to={`/mybusiness/${getUserData._id}`}>
                        My business
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/newbusiness"}>
                        Open a new bussiness
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleShow}>Logout</NavDropdown.Item>
                    </>
                  )
                    :
                    (
                      <>
                        <NavDropdown.Item as={Link} to={"/login"}>Login / Register</NavDropdown.Item>
                        {/* <NavDropdown.Item as={Link} to={"/register"}>Register</NavDropdown.Item> */}
                      </>
                    )
                }
              </NavDropdown>
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
          <h5>Are you sure you want to log out?</h5>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="btn btn-success" onClick={logOut}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

