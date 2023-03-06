import React, { useContext } from 'react'
// import Banner from '../components/general/Banner'
// import StyledHero from '../styles/StyledHero'
import * as Components from '../styles/StyledHero';
import '../styles/SingleBusiness.css'

//Gallery
import { Gallery } from '../components/singleBusiness/Gallery'
import { Container, Row, Tab, Nav } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';

import Calender from '../components/singleBusiness/Calender'
import Reviews from '../components/singleBusiness/Reviews'
import Contact from '../components/singleBusiness/Contact'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { BusinessContext } from '../context/BusinessContext'

export default function SingleBusiness() {

  let { name } = useParams();
  const context = useContext(BusinessContext)

  //get data of business
  const { getBusiness } = context;
  const business = getBusiness(name);

  return (
    <>
      {business === undefined ?
        <h1>Loading...</h1>
        :
        <>
          <Components.StyledHero img={business.backgroundPicture}>
            <Components.StyledBanner>
              <Components.StyledTitle><b>{business.name}</b></Components.StyledTitle>
            </Components.StyledBanner>
          </Components.StyledHero>

          <section className="project" id="project">
            {/* <Container> */}
              {/* <Row> */}
                {/* <Col size={12}> */}
                <TrackVisibility>
                  {({ isVisible }) =>
                    {
                      return <div className='single-business-container'>
                        {/* Description of business */}
                          <p>{business.description}</p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                          {/* Navbar of tabs */}
                          <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Gallery</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Calendar</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="third">Reviews</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="four">Contact</Nav.Link>
                            </Nav.Item>
                          </Nav>
                          {/* End of navbar of tabs */}
                          {/* Contents of the tabs */}
                          <Tab.Content id="slideInUp">
                            <Tab.Pane eventKey="first">
                              <Gallery id={business._id} name={name} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <Calender id={business._id} businessName={name} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              <Reviews id={business._id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="four">
                              <Contact business={business} />
                            </Tab.Pane>
                          </Tab.Content>
                          {/* End of contents of the tabs */}
                        </Tab.Container>
                      </div>;
                    }}
                </TrackVisibility>
                {/* </Col> */}
              {/* </Row> */}
            {/* </Container> */}
          </section>
        </>
      }
    </>
  )
}