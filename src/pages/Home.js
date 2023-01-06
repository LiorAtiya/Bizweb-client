import React, { Component } from 'react';
import SearchBox from '../components/home/SearchBox';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../database/categories';
import Hero from '../components/general/Hero';
import Banner from '../components/general/Banner'
import Top5 from '../components/home/Top5';
import AboutUs from '../components/home/AboutUs';

import CategoryBusiness from '../components/home/CategoryBusiness'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            category: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        this.setState({ category: categories })
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value }) // לקחת את הערך שנכתב בחיפוש
    }

    render() {

        const filteredCategories = this.state.category.filter(category => {
            return category.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) // לסנן כל ערך שמכיל את מה שנכתב בתיבת חיפוש
        })
        if (this.state.category.length === 0) {
            return <Hero><h1>Loading</h1></Hero>
        } else {
            return (
                <>
                    <Hero>
                        <Banner title="Facework" subtitle="Sample Site for any business">
                            <SearchBox searchChange={this.onSearchChange} />
                        </Banner>
                    </Hero>
                    <CategoryBusiness categories={filteredCategories} />
                    <Top5 />
                    <AboutUs />
                    <br/>
                </>
            );
        }
    }
}


export default Home;