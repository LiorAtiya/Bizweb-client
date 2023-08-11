import React from 'react'
import Hero from '../components/general/Hero'
import Banner from '../components/general/Banner'
import { Link } from 'react-router-dom'

export function Error() {
  return (
    <Hero>
      <Banner title="404" subtitle="Page not found">
      <Link to="/" className='btn-primary'>Return Home</Link>  
      </Banner>
    </Hero>
  )
}
