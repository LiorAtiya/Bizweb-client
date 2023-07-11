import React, { useState, useContext, useRef } from "react";
import "../../styles/SearchBox.css";
import { useTranslation } from "react-i18next";
import { BusinessContext } from "../../context/BusinessContext";
import defaultImg from "../../images/defaultImg.png";
import { Link } from "react-router-dom";

export function SearchBox() {
  const context = useContext(BusinessContext);
  const { handleChangeFilter, sortedBusiness } = context;
  const quickSearch = useRef();
  const { t } = useTranslation();
  const [language] = useState(localStorage.getItem("language"));

  return (
    <div className="">
      <div className="input-container">
        <input
          className={`rounded-full bg-white p-4 w-[95%] outline-none ${
            language === "he" ? "text-right" : null
          }`}
          name="businessName"
          type="text"
          id="search"
          ref={quickSearch}
          placeholder={t("QuickSearch")}
          onChange={handleChangeFilter}
        />
        <div className="search-btn">
          <i className="search-icon fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      {quickSearch.current !== undefined &&
      quickSearch.current.value.length !== 0 ? (
        <div className="absolute inset-x-0 z-50 w-3/5 m-auto text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg cursor-pointer top-30 z-5">
          {sortedBusiness?.slice(0, 5).map((business, i) => {
            return (
              <Link
                className="text-black no-underline"
                to={`/${business.category}/${business.name}`}
              >
                <div
                  key={i}
                  className={`w-full px-4 py-2 ${
                    sortedBusiness.slice(0, 5).length - 1 !== i
                      ? "border-b"
                      : null
                  } border-gray-500`}
                >
                  {language === "he" ? (
                    <div className={`flex justify-end`}>
                      <div className={`flex items-center justify-end mx-3`}>
                        {business.name}
                      </div>
                      <img
                        src={business.backgroundPicture || defaultImg}
                        className="w-16 h-16"
                        alt="business"
                      />
                    </div>
                  ) : (
                    <div className={`flex`}>
                      <img
                        src={business.backgroundPicture || defaultImg}
                        className="w-16 h-16"
                        alt="business"
                      />
                      <div className={`flex items-center justify-end mx-3`}>
                        {business.name}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
