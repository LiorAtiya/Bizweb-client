import React from 'react'
import BusinessFilter from './BusinessFilter'
import BusinessList from './BusinessList'
import { withBusinessConsumer } from '../../context/BusinessContext'
import Loading from '../Loading'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function BusinessContainer({ context }) {

  let { type } = useParams();

  const { loading, sortedBusiness, business } = context;
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <BusinessFilter business={business} />
      <BusinessList business={sortedBusiness} type={type}/>
    </>
  )
}

export default withBusinessConsumer(BusinessContainer)
