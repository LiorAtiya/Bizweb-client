import React from 'react'
import Banner from '../components/general/Banner'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BusinessContainer from '../components/category/BusinessContainer'
import categories from '../database/categories'
import StyledHero from '../styles/StyledHero'

export default function Category() {
  let { type } = useParams();

  let result = categories.find(item => item.name.toLowerCase() === type);
  
  return (
    <>
      <StyledHero img={result.image}>
        <Banner title={type}>
        </Banner>
      </StyledHero>
      <BusinessContainer />
    </>
  )
}
