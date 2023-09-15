import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from "../../images/defaultImg.png"
import '../../styles/BusinessCard.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

//Card of business from some category
export default function Business({ business }) {
  const {
    name,
    backgroundPicture,
    description,
    category,
    // location 
  } = business;

  return (
    <Link to={`/${category}/${name}`} className='business-card-container'>
      {console.log(backgroundPicture)}
      <Card sx={{ height: 330, textAlign: 'center', margin: '0px'}}>
        <CardMedia
          sx={{ height: 140 }}
          image={backgroundPicture.url || defaultImg}
          title={name}
        />
        <CardContent className='business-card-content'>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.substr(0, 120)}
          </Typography>
        </CardContent>
      </Card>
    </Link >
  );
}