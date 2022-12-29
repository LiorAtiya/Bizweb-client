import React from 'react'
import Card from 'react-bootstrap/Card';
import BingMapsReact from "bingmaps-react";
import waze from '../../images/waze.svg'
import googlemaps from '../../images/googlemaps.png'
import moovit from '../../images/moovit.webp'

export default function Googlemap({ business }) {

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }

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
      <div style={styles.container}>
        <div style={{ height: '50vh', width: '50%' }}>
          <Card style={{ textAlign: "center" }} body >
            <Card.Header>
              <b>City:</b> {business.city}<br />
              <b>Address:</b> {business.address}<br />
              <b>Phone:</b> {'0' + business.phone}<br />
            </Card.Header>
            <Card.Header>
              <img src={waze} alt="Logo" style={{ height: '60px', width: '60px', marginRight: "30px" }}
                onClick={() => {
                  window.open(`https://waze.com/ul?ll=${business.coordination.location.y},${business.coordination.location.x}&navigate=yes`, '_blank');
                }} />
              <img src={googlemaps} alt="Logo" style={{ height: '60px', width: '60px', marginRight: "20px" }}
                onClick={() => {
                  window.open(`https://maps.google.com?q=${business.coordination.location.y},${business.coordination.location.x}`, '_blank');
                }} />
              <img src={moovit} alt="Logo" style={{ height: '80px', width: '80px' }}
                onClick={() => {
                  window.open(`https://moovitapp.com/israel-1/poi/${business.city} ${business.address}/t/en?tll=${business.coordination.location.y}_${business.coordination.location.x}`, '_blank');
                }} />
            </Card.Header>
            <br />
            <BingMapsReact
              bingMapsKey="Am7ABZsl1hVs093AjZV82C3wxd-NCQ-KtBLpdtv4uB1UBvqIx7vcgN7Dw1A9RpQt"
              height="300px"
              mapOptions={{
                navigationBarMode: "square",
              }}
              width="600px"
              pushPins={pushPins}
              viewOptions={{
                center: {
                  latitude: business.coordination.location.y,
                  longitude: business.coordination.location.x
                },
                // mapTypeId: "grayscale",
              }}
            />
          </Card>
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  );
}