import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import defaultImg from "../../images/defaultImg.png"
import '../../styles/Categories.css'

export default function CategoryCard({ id, name, route, image }) {

  const getUserData = JSON.parse(localStorage.getItem('token'));

  const handleClick = async () => {
    if (getUserData) {

      const record = {
        firstname: getUserData.firstname,
        lastname: getUserData.lastname,
        username: getUserData.username,
        email: getUserData.email,
        category: name,
      }
      // Add to records the category entry
      await axios.post(`http://localhost:5015/api/users/${getUserData._id}/categoryEntry`, record)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  return (

    <Link to={route} onClick={handleClick}>
      <div className='card-category-container'>
        <div className="head-image">
          <img src={image || defaultImg} alt="single room" />
        </div>
        <div class='text-on-image'>
          <h1><b>{name}</b></h1>
        </div>
      </div>
    </Link>
  )
}