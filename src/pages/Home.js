import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
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
            user: [],
            prediction: undefined,
            searchfield: ''
        }
    }

    async componentDidMount() {
        this.setState({ category: categories });
        const getUserData = JSON.parse(localStorage.getItem('token'));
        this.setState({ user: getUserData });

        const record = {
            firstname: getUserData.firstname,
            lastname: getUserData.lastname,
            username: getUserData.username,
            email: getUserData.email
        }

        await axios.post(`http://localhost:5015/api/users/${getUserData._id}/prediction`, record)
        .then((res) => {
            this.setState({prediction: res.data[0]})
        })
        .catch((err) => console.log(err));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    handleClick = async () => {

        // Train & Create new model in bigML
        await axios.get(`http://localhost:5015/api/users/${this.state.user._id}/trainBigML`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
        
        
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
                        </Banner>
                    </Hero>
                    <SearchBox searchChange={this.onSearchChange} />
                    {
                        this.state.user?
                            this.state.prediction?
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