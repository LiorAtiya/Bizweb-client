import React from 'react'
import { useContext } from 'react'
import { BusinessContext } from '../../context/BusinessContext'
// import Title from "../components/Title"

//Get all uniqe values
const getUnique = (item, value) => {
  return [...new Set(item.map(item => item[value]))]
}

export default function BusinessFilter({ business }) {
  const context = useContext(BusinessContext)

  const {
    handleChange,
    city,
    // capacity,
    // price,
    // minPrice,
    // maxPrice,
    // minSize,
    // maxSize,
    // breakfast,
    // pets
  } = context;

  //get uniqe types
  let types = getUnique(business, "city")

  //add all
  types = ['all', ...types];

  //map to jsx
  types = types.map((item, index) => {
    return <option value={item} key={index}>{item}</option>
  })

  // let people = getUnique(business, 'capacity');
  // people = people.map((item, index) => {
  //   return <option key={index} value={item}>{item}</option>
  // })

  return (
    <section className='filter-container'>
      <form className='filter-form'>

        <div className='form-group'>
          <label htmlFor='type'><b>Filter by city</b></label>
          <select name='city' id='city' value={city} className='form-control' onChange={handleChange}>
            {types}
          </select>
        </div>

        <div className='form-group'>
            <label htmlFor='type'><b>Filter by name</b></label>
            <input 
                name='businessName'
                type='search'
                className='form-control'
                placeholder='Search by business name'
                onChange={handleChange}
            />
        </div>

        {/* guest */}
        {/* <div className='form-group'>
          <label htmlFor='capacity'>Guest</label>
          <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
            {people}
          </select>
        </div> */}
        {/* end guest */}
        {/* business price */}
        {/* <div className='form-group'>
          <label htmlFor='price'>
            Distance: {price}km
          </label>
          <input type='range' name='price' min={minPrice}
            max={maxPrice} id='price' value={price} onChange={handleChange}
            className='form-control' />
        </div> */}
        {/* end business price */}
        {/* size */}
        {/* <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input type='number' name='minSize' id='size'
              value={minSize} onChange={handleChange}
              className='size-input' />
            <input type='number' name='maxSize' id='size'
              value={maxSize} onChange={handleChange}
              className='size-input' />
          </div>
        </div> */}
        {/* end of size */}
        {/* extras */}
        {/* <div className='form-group'>
          <div className='single-extra'>
            <input
              type="checkbox"
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type="checkbox"
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div> */}
        {/* end of extras */}
      </form>
    </section>
  )
}
