import React, { useRef, useState } from 'react'
// import axios from "axios";
import { useHistory } from "react-router-dom";
import cities from '../database/cities'
import * as Components from '../styles/StyledForm';
import '../styles/NewBusiness.css'
import ApiClient from '../api/ApiRoutes';

export default function NewBusiness() {
    const category = useRef("");
    const name = useRef("");
    const description = useRef("");
    const city = useRef("");
    const address = useRef("");
    const phone = useRef("");
    const history = useHistory();

    const [backgroundPicture, setBackgroundPicture] = useState("");

    const [contactChecked, setContactChecked] = useState(false);

    let tabs = {};
    tabs.Gallery = false;
    tabs.Calender = false;
    tabs.Shop = false;
    tabs.Reviews = false;
    tabs.Contact = false;

    const citiesMap = cities.map((item, index) => {
        return <option value={item.name} key={index}>{item.name}</option>
    })

    //Update background image in cloundinary
    const handleOpenWidget = () => {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dk5mqzgcv',
            uploadPreset: 'xw93prxe'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                setBackgroundPicture(result.info.url);
            }
        }
        )

        //open widget
        myWidget.open();
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const filterTabs = Object.keys(tabs).filter(key => {
            return tabs[key] === true;
        })

        const business = {
            category: category.current.value,
            name: name.current.value,
            description: description.current.value,
            city: city.current.value,
            address: address.current.value,
            phone: phone.current.value,
            backgroundPicture: backgroundPicture,
            tabs: filterTabs
        }

        //send request to server to add new business
        ApiClient.addNewBusiness(business)
            .then((res) => {
                if (res.status === 200) {
                    //add id of business to list of business of user
                    const businessID = res.data._id;
                    const getUserData = JSON.parse(localStorage.getItem('token'));
                    const business = {
                        userID: getUserData._id,
                        business: businessID
                    }

                    ApiClient.addBusinessToUser(getUserData._id, business)
                        .then((res) => {
                            window.localStorage.removeItem('token');
                            window.localStorage.setItem("token", JSON.stringify(res.data));

                            history.push('/');
                            window.location.reload(false);
                        }).catch((err) => console.log(err));

                }
            }).catch((err) => console.log(err));
    }

    const handleGallery = (e) => { tabs.Gallery = e.target.checked; }
    const handleShop = (e) => { tabs.Shop = e.target.checked; }
    const handleCalender = (e) => { tabs.Calender = e.target.checked; }
    const handleReviews = (e) => { tabs.Reviews = e.target.checked; }
    const handleContact = (e) => {
        const checkedValue = e.target.checked;
        setContactChecked(checkedValue);
        tabs.Contact = checkedValue;
    }

    return (
        <Components.NewBusinessContainer>

            <Components.NewBusinessForm>
                <Components.Title>Open a new business</Components.Title>
                <br />
                <div className="mb-3">
                    <label>
                        <b>Category of your business:</b><br />
                        <Components.Select ref={category}>
                            <option value="Barbershop">Barbershop</option>
                            <option value="Nail Polish">Nail Polish</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Professionals">Professionals</option>
                            <option value="Personal Trainers">Personal Trainers</option>
                            <option value="Private Teachers">Private Teachers</option>
                        </Components.Select>
                    </label>
                </div>

                <Components.NewBusinessInput type='text' placeholder='Business Name'
                    required ref={name}
                />
                <Components.TextArea type='textarea' placeholder='Description'
                    required ref={description}
                />

                <b>Choose what you want in your business:</b>
                <div className="mb-3 tabs-container">
                    <div className='checkbox-tab'>
                        <input type="checkbox" value='gallery' onChange={handleGallery} /> Gallery
                    </div>
                    <div className='checkbox-tab'>
                        <input type="checkbox" value='shop' onChange={handleShop} /> Shop
                    </div>
                    <div className='checkbox-tab'>
                        <input type="checkbox" value='calender' onChange={handleCalender} /> Callender
                    </div>
                    <div className='checkbox-tab'>
                        <input type="checkbox" value='reviews' onChange={handleReviews} /> Reviews
                    </div>
                    <div className='checkbox-tab'>
                        <input type="checkbox" value='contact' onChange={handleContact} /> Contact
                    </div>
                </div>

                {
                    contactChecked ?
                        <>
                            <div className="mb-3">
                                <label>
                                    <b>City:</b><br></br>
                                    <Components.Select ref={city}>
                                        {citiesMap}
                                    </Components.Select>
                                </label>
                            </div>

                            <Components.NewBusinessInput type='text' placeholder='Address'
                                required ref={address}
                            />

                            <Components.NewBusinessInput type='number' placeholder='Phone'
                                required ref={phone}
                            />
                        </>
                        : null
                }

                <div className="mb-3">
                    <Components.ButtonPic id='upload-widget' className='cloudinary-button' onClick={handleOpenWidget}>
                        Choose background image
                    </Components.ButtonPic>
                    {
                        backgroundPicture !== "" ?
                            <Components.Pic>
                                <img src={backgroundPicture} alt="backPic" />
                            </Components.Pic>
                            :
                            null
                    }
                </div>

                <Components.Button type="button" onClick={handleClick}>Create</Components.Button>
            </Components.NewBusinessForm>

        </Components.NewBusinessContainer >
    )
}
