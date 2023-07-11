import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchBox } from "../components/home/SearchBox";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "../components/general/Hero";
import Top5 from "../components/home/Top5";
import AboutUs from "../components/home/AboutUs";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from "react-i18next";

import { BusinessContext } from "../context/BusinessContext";

import categories from "../database/categories";
import Categories from "../components/home/Categories";

export function Home() {
  const [user, setUser] = useState("");
  const [prediction, setPrediction] = useState("");
  //   const [searchfield, setSearchfield] = useState("");
  const [allCategories, setAllCategories] = useState(categories);

  const { business } = useContext(BusinessContext);

  const { t } = useTranslation();

  useEffect(() => {
    const getResult = async () => {
      const getUserData = JSON.parse(localStorage.getItem("token"));

      if (getUserData) {
        setUser(getUserData);

        const record = {
          firstname: getUserData.firstname,
          lastname: getUserData.lastname,
          username: getUserData.username,
          email: getUserData.email,
        };

        ApiClient.prediction(getUserData._id, record)
          .then((predict) => setPrediction(predict[0]))
          .catch((error) => console.error(error));
      }

      const categoriesMaped = categories.map((category) => {
        return { ...category, name: t(category.name) };
      });

      setAllCategories(categoriesMaped);
    };
    getResult();
  }, [t]);

  const handleClickPredict = async () => {
    // Train & Create new model in bigML
    ApiClient.trainModel(user._id)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  //   const onSearchChange = (event) => {
  //     setSearchfield(event.target.value);
  //   };

  //   const filteredCategories = allCategories.filter((category) => {
  //     return category.name.toLowerCase().includes(searchfield.toLowerCase()); // לסנן כל ערך שמכיל את מה שנכתב בתיבת חיפוש
  //   });

  return (
    <>
      <Hero>
        <div className="container-logo">
          <div className="left-logo">BIZ</div>
          <div className="right-logo">WEB</div>
        </div>
      </Hero>
      <SearchBox business={business} />
      {/* <Link to={`/`} onClick={this.handleClick}>
                                    <button className='btnPredictBigml'>Click train</button>
                                </Link> */}
      {user ? (
        prediction ? (
          <h6 className="predictBigml">
            {t("interest")}
            <Link
              to={`/${prediction.toLowerCase()}`}
              onClick={handleClickPredict}
            >
              <button className="btnPredictBigml">{t(prediction)}</button>
            </Link>
          </h6>
        ) : null
      ) : null}
      
      <Categories categories={allCategories} />
      <Top5 />
      <AboutUs />
      <br />
    </>
  );
}
