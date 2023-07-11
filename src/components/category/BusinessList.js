import React from 'react'
import Business from './Business'
import { useTranslation } from 'react-i18next';

export default function BusinessList({ business, type }) {

  const { t } = useTranslation();

  //filter by name category
  const businessPerType = business.filter(busi => busi.category.toLowerCase() === type);
  
  if (business.length === 0 || businessPerType.length === 0) {
    return (
      <div className='empty-search'>
        <h3>{t("Unfortunately")}</h3>
      </div>
    )
  }

  return <section className='roomslist'>
    <div className='roomslist-center'>
      {
        businessPerType.map(item => {
          return <Business key={item._id} business={item} />
        })
      }
    </div>
  </section>
}
