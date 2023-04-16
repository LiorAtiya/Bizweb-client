import React, { useContext } from 'react'
// import Banner from '../components/general/Banner'
// import StyledHero from '../styles/StyledHero'
import * as Components from '../styles/StyledHero';
import '../styles/SingleBusiness.css'

//Gallery
import { Gallery } from '../components/singleBusiness/Gallery'
import { Tab, Nav } from "react-bootstrap";
// import TrackVisibility from 'react-on-screen';

import Calender from '../components/singleBusiness/Calender'
import Reviews from '../components/singleBusiness/Reviews'
import Contact from '../components/singleBusiness/Contact'
import Shop from '../components/singleBusiness/Shop';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { BusinessContext } from '../context/BusinessContext'

export default function SingleBusiness() {

  let { name } = useParams();
  const context = useContext(BusinessContext)

  //get data of business
  const { getBusiness } = context;
  const business = getBusiness(name);

  return (
    <div className='business-container'>
      {business === undefined ?
        <h1>Loading...</h1>
        :
        <>
          <Components.StyledHero img={business.backgroundPicture}>
            <Components.StyledBanner>
              <Components.StyledTitle><b>{business.name}</b></Components.StyledTitle>
            </Components.StyledBanner>
          </Components.StyledHero>

          <section className="project content-container" id="project">
              {/* Description of business */}
              <p>{business.description}</p>
              <Tab.Container id="projects-tabs" defaultActiveKey="tab-first">
                {/* Navbar of tabs */}
                <div className={`num-tab-${business.tabs.length}`}>
                  <Nav variant="pills">
                    {
                      business.tabs.map((tab, i) => {
                        if (i === 0) {
                          return (
                            <Nav.Item key={i}>
                              <Nav.Link eventKey={'tab-first'}>{tab}</Nav.Link>
                            </Nav.Item>
                          )
                        } else if (i === business.tabs.length - 1) {
                          return (
                            <Nav.Item key={i}>
                              <Nav.Link eventKey={'tab-last'}>{tab}</Nav.Link>
                            </Nav.Item>
                          )
                        } else {
                          return (
                            <Nav.Item key={i}>
                              <Nav.Link eventKey={'tab-' + tab}>{tab}</Nav.Link>
                            </Nav.Item>
                          )
                        }
                      })
                    }
                  </Nav>
                </div>
                {/* End of navbar of tabs */}
                {/* Contents of the tabs */}
                <Tab.Content id="slideInUp">
                  {
                    business.tabs.map((tab, i) => {
                      switch (tab) {
                        case 'Gallery':
                          return (
                            <Tab.Pane eventKey="tab-first" key={i}>
                              <Gallery id={business._id} name={name} />
                            </Tab.Pane>
                          )
                        case 'Calender':
                          if (i === 0) {
                            return (
                              <Tab.Pane eventKey="tab-first" key={i}>
                                <Calender id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          } else if (i === business.tabs.length - 1) {
                            return (
                              <Tab.Pane eventKey="tab-last" key={i}>
                                <Calender id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          } else {
                            return (
                              <Tab.Pane eventKey={'tab-' + tab} key={i}>
                                <Calender id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          }
                        case 'Shop':
                          if (i === 0) {
                            return (
                              <Tab.Pane eventKey="tab-first" key={i}>
                                <Shop id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          } else if (i === business.tabs.length - 1) {
                            return (
                              <Tab.Pane eventKey="tab-last" key={i}>
                                <Shop id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          } else {
                            return (
                              <Tab.Pane eventKey={'tab-' + tab} key={i}>
                                <Shop id={business._id} businessName={name} />
                              </Tab.Pane>
                            )
                          }
                        case 'Reviews':
                          if (i === 0) {
                            return (
                              <Tab.Pane eventKey="tab-first" key={i}>
                                <Reviews id={business._id} />
                              </Tab.Pane>
                            )
                          } else if (i === business.tabs.length - 1) {
                            return (
                              <Tab.Pane eventKey="tab-last" key={i}>
                                <Reviews id={business._id} />
                              </Tab.Pane>
                            )
                          } else {
                            return (
                              <Tab.Pane eventKey={'tab-' + tab} key={i}>
                                <Reviews id={business._id} />
                              </Tab.Pane>
                            )
                          }
                        case 'Contact':
                          return (
                            <Tab.Pane eventKey="tab-last" key={i}>
                              <Contact business={business} />
                            </Tab.Pane>
                          )
                        default:
                          return null
                      }
                    })
                  }
                </Tab.Content>
                {/* End of contents of the tabs */}
              </Tab.Container>
          </section>
        </>
      }
    </div>
  )
}