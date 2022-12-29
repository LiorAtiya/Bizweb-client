import React from 'react'
import Business from './Business'

export default function BusinessList({ business, type }) {

  let exist = business.filter(busi => busi.category.toLowerCase() === type);
  
  if (business.length === 0 || exist.length === 0) {
    return (
      <div className='empty-search'>
        <h3>Unfortunately no business matched your search parameters</h3>
      </div>
    )
  }
  //filter by name category
  const tempBusiness = business.filter(busi => busi.category.toLowerCase() === type);

  return <section className='roomslist'>
    <div className='roomslist-center'>
      {
        tempBusiness.map(item => {
          return <Business key={item._id} business={item} />
        })
      }
    </div>
  </section>
}
