import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import cities from "../database/cities";
import * as Components from "../styles/StyledForm";
import "../styles/NewBusiness.css";
import ApiClient from "../api/ApiRoutes";
import { useTranslation } from "react-i18next";
import { openWidgetUploadImage } from "../api/cloudinary";

export function NewBusiness() {
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("token");

  const category = useRef("");
  const name = useRef("");
  const description = useRef("");
  const city = useRef("");
  const address = useRef("");
  const phone = useRef("");
  const history = useHistory();
  const [backgroundPicture, setBackgroundPicture] = useState("");

  const [tabs, setTabs] = useState({
    Gallery: false,
    Calender: false,
    Shop: false,
    Reviews: false,
    Contact: false,
  });

  const citiesMap = cities?.map((item, index) => {
    return (
      <option value={item.name} key={index}>
        {item.name}
      </option>
    );
  });

  const handleCreateNewBusiness = async (e) => {
    e.preventDefault();

    const filterTabs = Object.keys(tabs).filter((key) => {
      return tabs[key] === true;
    });

    const business = {
      category: category.current.value,
      name: name.current.value,
      description: description.current.value,
      city: city.current ? city.current.value : "",
      address: address.current ? address.current.value : "",
      phone: phone.current ? phone.current.value : "",
      backgroundPicture: backgroundPicture,
      tabs: filterTabs,
    };

    //No tab is selected
    if (filterTabs.length === 0) {
      alert("Select at least one category");
      return;
    } else if (
      (business.name === "") |
      (business.description === "") |
      (tabs.Contact & (business.address === "") & (business.phone === ""))
    ) {
      alert("Fill in all the details");
      return;
    }

    //send request to server to add new business
    ApiClient.addNewBusiness(token, business)
      .then((res) => {
        alert("New business created");
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response.status === 401)
          return alert("Business name already exists");
      });
  };

  const handleGallery = (e) => {
    setTabs({ ...tabs, Gallery: e.target.checked });
  };
  const handleShop = (e) => {
    setTabs({ ...tabs, Shop: e.target.checked });
  };
  const handleCalender = (e) => {
    setTabs({ ...tabs, Calender: e.target.checked });
  };
  const handleReviews = (e) => {
    setTabs({ ...tabs, Reviews: e.target.checked });
  };
  const handleContact = (e) => {
    setTabs({ ...tabs, Contact: e.target.checked });
  };

  return (
    <Components.NewBusinessContainer>
      <Components.NewBusinessForm>
        <Components.Title>{t("OpenNewBussiness")}</Components.Title>
        <br />
        <div className="mb-3">
          <label>
            <b>{t("Category")}</b>
            <br />
            <Components.Select
              className={i18n.language === "he" ? "text-right" : null}
              ref={category}
            >
              <option value="Barbershop">{t("Barbershop")}</option>
              <option value="Nail Polish">{t("Nail Polish")}</option>
              <option value="Restaurants">{t("Restaurants")}</option>
              <option value="Professionals">{t("Professionals")}</option>
              <option value="Personal Trainers">
                {t("Personal Trainers")}
              </option>
              <option value="Private Teachers">{t("Private Teachers")}</option>
            </Components.Select>
          </label>
        </div>

        <Components.NewBusinessInput
          type="text"
          placeholder={t("BusinessName")}
          required
          ref={name}
          maxLength="15"
          className={i18n.language === "he" ? "text-right" : null}
        />
        <Components.TextArea
          type="textarea"
          placeholder={t("Description")}
          required
          ref={description}
          maxLength="400"
          className={i18n.language === "he" ? "text-right" : null}
        />

        <b>{t("ChooseTabs")}</b>
        <div className="mb-3 tabs-container">
          <div className="checkbox-tab">
            <input type="checkbox" value="gallery" onChange={handleGallery} />{" "}
            {t("Gallery")}
          </div>
          <div className="checkbox-tab">
            <input type="checkbox" value="shop" onChange={handleShop} />{" "}
            {t("Shop")}
          </div>
          <div className="checkbox-tab">
            <input type="checkbox" value="calender" onChange={handleCalender} />{" "}
            {t("Calender")}
          </div>
          <div className="checkbox-tab">
            <input type="checkbox" value="reviews" onChange={handleReviews} />{" "}
            {t("Reviews")}
          </div>
          <div className="checkbox-tab">
            <input type="checkbox" value="contact" onChange={handleContact} />{" "}
            {t("Contact")}
          </div>
        </div>

        {tabs.Contact ? (
          <>
            <div className="mb-3">
              <label>
                <b>{t("City")}</b>
                <br></br>
                <Components.Select ref={city}>{citiesMap}</Components.Select>
              </label>
            </div>

            <Components.NewBusinessInput
              type="text"
              placeholder={t("Address")}
              required
              ref={address}
            />

            <Components.NewBusinessInput
              type="number"
              placeholder={t("Phone")}
              required
              ref={phone}
            />
          </>
        ) : (
          <></>
        )}

        <div className="mb-3">
          <Components.ButtonPic
            id="upload-widget"
            className="cloudinary-button"
            onClick={() => openWidgetUploadImage(setBackgroundPicture)}
          >
            {t("BackgroundImage")}
          </Components.ButtonPic>
          {backgroundPicture !== "" ? (
            <Components.Pic>
              <img src={backgroundPicture.url} alt="backPic" />
            </Components.Pic>
          ) : null}
          
        </div>

        <Components.Button type="button" onClick={handleCreateNewBusiness}>
          {t("Create")}
        </Components.Button>
      </Components.NewBusinessForm>
    </Components.NewBusinessContainer>
  );
}
