import React from 'react'
// import Hero from '../components/Hero'
// import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import defaultImg from "../../images/defaultImg.png"
// import PropTypes from "prop-types";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';

//Card of business from some category
export default function Business({ business }) {
  const {
    // category, 
    name,
    backgroundPicture,
    description
    // location 
  } = business;

  return (
    <Link to={`/business/${name}`} className='business-name'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={backgroundPicture || defaultImg}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Link >
  );

  // return (
  //   <article className='room'>
  //     <div className='img-container'>
  //       <img src={backgroundPicture || defaultImg} alt="single room" />
  //       {/* <div className='price-top'>
  //         <h6>${price}</h6>
  //         <p>per night</p>
  //       </div> */}
  //       <Link to={`/business/${name}`}
  //         className="btn-primary room-link">
  //         Enter
  //       </Link>
  //       <p className='room-info'>{name}</p>
  //     </div>
  //   </article>
  //   // <Hero hero="roomsHero">
  //   //   <Banner title={category}>
  //   //     <Link to="/" className='btn-primary'>Return home</Link>
  //   //   </Banner>
  //   // </Hero>
  // )
}

// //Checks if the props is passed
// Business.propTypes = {
//   business: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     images: PropTypes.arrayOf(PropTypes.string).isRequired,
//     price: PropTypes.number.isRequired
//   })
// }