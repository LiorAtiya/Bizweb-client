import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import categories from "../database/categories";
import { useTranslation } from "react-i18next";
import { BusinessContext } from "../context/BusinessContext";

import Hero from "../components/general/Hero";
import Top5 from "../components/home/Top5";
import AboutUs from "../components/home/AboutUs";
import Categories from "../components/home/Categories";
import { SearchBox } from "../components/home/SearchBox";
import ApiClient from "../api/ApiRoutes";

export function Home() {
  const [user, setUser] = useState("");
  const [prediction, setPrediction] = useState("");
  const [allCategories, setAllCategories] = useState(categories);

  const { business, getUserInfo } = useContext(BusinessContext);

  const { t } = useTranslation();

  useEffect(() => {
    // const targetTitle = document.getElementById("about");
    // if (targetTitle) {
    //   targetTitle.scrollIntoView({ behavior: "smooth" });
    // }

    const getResult = async () => {
      const getUserData = getUserInfo();

      if (getUserData) {
        setUser(getUserData);

        const record = {
          firstname: getUserData.firstname,
          lastname: getUserData.lastname,
          username: getUserData.username,
          email: getUserData.email,
        };

        ApiClient.prediction(record)
          .then((predict) => setPrediction(predict[0]))
          .catch((error) => console.error(error));
      }

      const categoriesMaped = categories.map((category) => {
        return { ...category, name: t(category.name), type: category.name };
      });

      setAllCategories(categoriesMaped);
    };
    getResult();
  }, [t, getUserInfo]);

  const handleClickPredict = async () => {
    // Train & Create new model in bigML
    ApiClient.trainModel()
      .then((res) => {})
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Hero>
        <div className="container-logo">
          <div className="left-logo">BIZ</div>
          <div className="right-logo">WEB</div>
        </div>
      </Hero>
      <SearchBox business={business} />
      {/* <Link to={`/`} onClick={handleClickPredict}>
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
      <div id="about">
        <AboutUs />
      </div>
      <br />
    </>
  );
}
