import BingMapsReact from "bingmaps-react";
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import waze from '../../images/waze.svg'
import googlemaps from '../../images/googlemaps.png'
import moovit from '../../images/moovit.webp'
import '../../styles/Contact.css'
import { useTranslation } from 'react-i18next';

export default function Googlemap({ business }) {

  const [flagMap, setFlagMap] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlagMap(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const pushPin = {
    center: {
      latitude: business.coordination.location.y,
      longitude: business.coordination.location.x,
    },
    options: {
      title: business.address + ", " + business.city,
    },
  }

  const pushPins = [pushPin];

  return (
    <>
      <div className="contact-container">
        <Card body className="contact-card">
          {
            i18n.language === 'he' ?
              <Card.Header>
                <b>עיר:</b> {business.city}<br />
                <b>כתובת:</b> {business.address}<br />
                <b>פלאפון:</b> {'0' + business.phone}<br />
              </Card.Header>
              :
              <Card.Header>
                <b>City:</b> {business.city}<br />
                <b>Address:</b> {business.address}<br />
                <b>Phone:</b> {'0' + business.phone}<br />
              </Card.Header>
          }
          
          <div className="flex justify-between w-[50%] m-auto">
            <img src={waze} alt="Logo" style={{ height: '60px', width: '60px'}} className="mt-2"
              onClick={() => {
                window.open(`https://waze.com/ul?ll=${business.coordination.location.y},${business.coordination.location.x}&navigate=yes`, '_blank');
              }} />
            <img src={googlemaps} alt="Logo" style={{ height: '60px', width: '60px'}} className="mt-2"
              onClick={() => {
                window.open(`https://maps.google.com?q=${business.coordination.location.y},${business.coordination.location.x}`, '_blank');
              }} />
            <img src={moovit} alt="Logo" style={{ height: '80px', width: '80px' }}
              onClick={() => {
                window.open(`https://moovitapp.com/israel-1/poi/${business.city} ${business.address}/t/en?tll=${business.coordination.location.y}_${business.coordination.location.x}`, '_blank');
              }} />
          </div>
          <br />
          {
            flagMap ?
              <BingMapsReact
                bingMapsKey={process.env.REACT_APP_BING_MAPS_KEY}
                height="300px"
                mapOptions={{
                  navigationBarMode: "square",
                }}
                width="100%"
                pushPins={pushPins}
                viewOptions={{
                  center: {
                    latitude: business.coordination.location.y,
                    longitude: business.coordination.location.x
                  },
                  // mapTypeId: "grayscale",
                }}
              />
              :
              null
          }
        </Card>
      </div>
    </>
  );
}