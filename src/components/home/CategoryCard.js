import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../images/defaultImg.png";
import "../../styles/Categories.css";
import ApiClient from "../../api/ApiRoutes";

export default function CategoryCard({type, name, route, image }) {
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    if (token) {
      // Add to records the category entry
      ApiClient.addRecordEntry(token, { category: type })
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  };

  return (
    <Link to={route} onClick={handleClick}>
      <div className="card-category-container">
        <img src={image || defaultImg} alt="category" />
        <div className="text-on-image">
          <h1>
            <b>{name}</b>
          </h1>
        </div>
      </div>
    </Link>
  );
}
