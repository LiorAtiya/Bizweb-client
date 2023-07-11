import React from 'react'
import BusinessFilter from './BusinessFilter'
import BusinessList from './BusinessList'
import { withBusinessConsumer } from '../../context/BusinessContext'
import Loading from '../home/Loading'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function BusinessContainer({ context }) {

  let { type } = useParams();

  const { loading, sortedBusiness } = context;
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <BusinessFilter />
      <BusinessList business={sortedBusiness} type={type}/>
    </>
  )
}

export default withBusinessConsumer(BusinessContainer)
