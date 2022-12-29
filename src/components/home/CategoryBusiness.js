import React, { Component } from 'react'
import { BusinessContext } from '../../context/BusinessContext'
import Loading from "../Loading"
// import Title from '../Title';
import CategoryCard from './CategoryCard';
import '../../styles/Categories.css'

export default class CategoryBusiness extends Component {

  static contextType = BusinessContext;

  render() {
    let { loading } = this.context;
    let category = this.props.categories;

    category = category.map((busi, i) => {
      return <CategoryCard 
              key={i} 
              id={category[i].id} 
              name={category[i].name} 
              route={category[i].route}
              image={category[i].image}/>
    })
    return (
      <section className='featured-rooms'>
        {/* <Title title="categories" /> */}
        <div className='featured-rooms-center'>
          {loading ? <Loading /> : category}
        </div>
      </section>
    )
  }
}
