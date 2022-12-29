import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from "../../images/defaultImg.png"
import '../../styles/Categories.css'

export default function CategoryCard({ id, name, route, image }) {

  return (

    //  <article className='room'>
    <Link to={route}>
    <div className='card-category-container'>
      <div className="head-image">
        <img src={image || defaultImg} alt="single room" />
      </div>
      <div class='text-on-image'>
        <h1><b>{name}</b></h1>
      </div>
      {/* <Link to={route}
        className="btn-primary room-link">
        Enter
      </Link>
      <p className='room-info'>{name}</p> */}
    </div>
    </Link>
    // </article> 
  )
}