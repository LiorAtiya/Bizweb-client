import React from 'react'

export default function Banner({children,title,subtitle}) {
  return (
    <div className='banner'>
        <h1><b>{title}</b></h1>
        {/* <div/> */}
        <p>{subtitle}</p>
        {children}
    </div>
  )
}
