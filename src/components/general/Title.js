import React from 'react'

export default function Title({title, color}) {
  return (
    <div className='section-title' style={{color: color}}>
        <h2><b>{title}</b></h2>
        {/* <div /> */}
    </div>
  )
}
