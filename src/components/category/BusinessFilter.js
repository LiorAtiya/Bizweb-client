import React from "react";
import { useContext } from "react";
import { BusinessContext } from "../../context/BusinessContext";
// import Title from "../components/Title"
import { useTranslation } from "react-i18next";

//Get all uniqe values
const getUnique = (item, value) => {
  return [...new Set(item.map((item) => item[value]))];
};

export default function BusinessFilter() {
  const context = useContext(BusinessContext);

  const { t, i18n } = useTranslation();

  const { handleChangeFilter, city, business } = context;

  //get uniqe types
  let types = getUnique(business, "city");

  //add all
  types = ["all", ...types];

  //map to jsx
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <form
        className={`filter-form ${
          i18n.language === "he" ? "text-right" : null
        }`}
      >
        <div className={`form-group`}>
          <label htmlFor="type">
            <b>{t("FilterCity")}</b>
          </label>
          <select
            name="city"
            id="city"
            value={city}
            className={`form-control ${
              i18n.language === "he" ? "text-right" : null
            }`}
            onChange={handleChangeFilter}
          >
            {types}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">
            <b>{t("FilterName")}</b>
          </label>
          <input
            name="businessName"
            type="search"
            className={`form-control ${
              i18n.language === "he" ? "text-right" : null
            }`}
            placeholder={t("FieldName")}
            onChange={handleChangeFilter}
          />
        </div>

      </form>
    </section>
  );
}
