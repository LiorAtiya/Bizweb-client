import React from 'react'
// import Banner from '../components/general/Banner'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BusinessContainer from '../components/category/BusinessContainer'
import categories from '../database/categories'
// import { StyledHero } from '../styles/StyledHero'
import * as Components from '../styles/StyledHero';
import '../styles/BusinessList.css'
import { useTranslation } from 'react-i18next';

export default function Category() {
  let { type } = useParams();

  const { t } = useTranslation();

  let result = categories.find(item => item.name.toLowerCase() === type);

  return (
    <>
      <Components.StyledHero img={result.image}>
        <Components.StyledBanner>
          <Components.StyledTitle><b>{t(result.name)}</b></Components.StyledTitle>
        </Components.StyledBanner>
      </Components.StyledHero>
      <BusinessContainer />
    </>
  )
}
