import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBox from '../components/home/SearchBox';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../database/categories';
import Hero from '../components/general/Hero';
import Top5 from '../components/home/Top5';
import AboutUs from '../components/home/AboutUs';
import ApiClient from '../api/ApiRoutes';

import CategoryBusiness from '../components/home/CategoryBusiness'

// import axios from "axios";
// import Banner from '../components/general/Banner'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            category: [],
            user: [],
            prediction: undefined,
            searchfield: ''
        }
    }

    async componentDidMount() {
        this.setState({ category: categories });
        const getUserData = JSON.parse(localStorage.getItem('token'));

        if (getUserData) {

            this.setState({ user: getUserData });

            const record = {
                firstname: getUserData.firstname,
                lastname: getUserData.lastname,
                username: getUserData.username,
                email: getUserData.email
            }

            ApiClient.prediction(getUserData._id, record)
                .then(predict => this.setState({ prediction: predict[0] }))
                .catch(error => console.error(error));
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    handleClick = async () => {
        // Train & Create new model in bigML
        ApiClient.trainModel(this.state.user._id)
            .then(res => console.log(res))
            .catch(error => console.error(error));
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
                        <div className='container-logo'>
                            <div className='left-logo'>
                                BIZ
                            </div>
                            <div className='right-logo'>
                                WEB
                            </div>
                        </div>
                        {/* <Banner title="Bizweb" subtitle="All business in one place">
                            <div>
                                lior
                            </div>
                        </Banner> */}
                    </Hero>
                    <SearchBox searchChange={this.onSearchChange} />
                    {/* <Link to={`/`} onClick={this.handleClick}>
                        <button className='btnPredictBigml'>Click train</button>
                    </Link> */}
                    {
                        this.state.user ?
                            this.state.prediction ?
                                <h6 className='predictBigml'>Maybe you are interested in
                                    <Link to={`/category/${this.state.prediction.toLowerCase()}`} onClick={this.handleClick}>
                                        <button className='btnPredictBigml'>{this.state.prediction}</button>
                                    </Link>
                                    ?
                                </h6>
                                :
                                null
                            :
                            null
                    }
                    <CategoryBusiness categories={filteredCategories} />
                    <Top5 />
                    <AboutUs />
                    <br />
                </>
            );
        }
    }
}


export default Home;