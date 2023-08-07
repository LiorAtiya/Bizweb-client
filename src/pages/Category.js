import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BusinessContainer from "../components/category/BusinessContainer";
import categories from "../database/categories";
import * as Components from "../styles/StyledHero";
import "../styles/BusinessList.css";
import { useTranslation } from "react-i18next";

export function Category() {
  let { type } = useParams();
  const { t } = useTranslation();

  let result = categories.find((item) => item.name.toLowerCase() === type);
  
  return (
    <>
      <Components.StyledHero img={result.image}>
        <Components.StyledBanner>
          <Components.StyledTitle>
            <b>{t(result.name)}</b>
          </Components.StyledTitle>
        </Components.StyledBanner>
      </Components.StyledHero>

      <BusinessContainer />
    </>
  );
}
