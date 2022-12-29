import React, { useRef, useState } from 'react'
// import Hero from '../components/Hero';
import axios from "axios";
import { useHistory } from "react-router-dom";
import cities from '../database/cities'
import * as Components from '../components/StyledForm';

export default function NewBusiness() {
    const category = useRef("");
    const name = useRef();
    const description = useRef();
    const city = useRef();
    const address = useRef();
    const phone = useRef();
    const history = useHistory();

    const [backgroundPicture, setBackgroundPicture] = useState("");

    const citiesMap = cities.map((item, index) => {
        return <option value={item.name} key={index}>{item.name}</option>
    })

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

        const business = {
            category: category.current.value,
            name: name.current.value,
            description: description.current.value,
            city: city.current.value,
            address: address.current.value,
            phone: phone.current.value,
            backgroundPicture: backgroundPicture,
        }
        try {
            //send request to server to add new business
            await axios.post("http://localhost:5015/api/business/add", business)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        //add id of business to list of business of user
                        const businessID = res.data._id;
                        const getUserData = JSON.parse(localStorage.getItem('token'));
                        const business = {
                            userID: getUserData._id,
                            business: businessID
                        }
                        axios.put(`http://localhost:5015/api/users/${getUserData._id}/business`, business)
                            .then((res) => {
                                window.localStorage.removeItem('token');
                                window.localStorage.setItem("token", JSON.stringify(res.data));

                                history.push('/');
                                window.location.reload(false);
                            });

                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    // const [signIn, toggle] = useState(true);

    return (
        <Components.NewBusinessContainer>

            <Components.NewBusinessForm onSubmit={handleClick}>
                <Components.Title>Open a new business</Components.Title>
                <br />
                <div className="mb-3">
                    <label>
                        <b>Category of your business:</b><br />
                        <Components.Select ref={category}>
                            <option value="Barbershop">Barbershop</option>
                            <option value="Nail Polish">Nail Polish</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Renovations">Renovations</option>
                        </Components.Select>
                    </label>
                </div>

                <Components.Input type='text' placeholder='Business Name'
                    required ref={name}
                />
                <Components.TextArea type='textarea' placeholder='Description'
                    required ref={description}
                />

                <div className="mb-3">
                    <label>
                        <b>City:</b><br></br>
                        <Components.Select ref={city}>
                            {citiesMap}
                        </Components.Select>
                    </label>
                </div>

                <Components.Input type='text' placeholder='Address'
                    required ref={address}
                />

                <Components.Input type='number' placeholder='Phone'
                    required ref={phone}
                />

                <div className="mb-3">
                    <Components.ButtonPic id='upload-widget' className='cloudinary-button' onClick={() => handleOpenWidget()}>
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

                <Components.Button type="submit">Create</Components.Button>
            </Components.NewBusinessForm>

        </Components.NewBusinessContainer>
    )

    // return (
    //     <Hero hero="roomsHero">
    //         <div className="auth-wrapper">
    //             <form onSubmit={handleClick} className="auth-inner">
    //                 <h3>Open New Business</h3>

    //                 <div className="mb-3">
    //                     <label>
    //                         Category of your business:<br></br>
    //                         <select className="form-control" ref={category}>
    //                             <option value="Barbershop">Barbershop</option>
    //                             <option value="Nail Polish">Nail Polish</option>
    //                             <option value="Restaurants">Restaurants</option>
    //                             <option value="Renovations">Renovations</option>
    //                         </select>
    //                     </label>
    //                 </div>

    //                 <div className="mb-3">
    //                     <label>Name Business</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         placeholder="Enter name business"
    //                         required
    //                         ref={name}
    //                     />
    //                 </div>

    //                 <div className="mb-3">
    //                     <label>Description</label>
    //                     <textarea
    //                         placeholder="Description of the business"
    //                         className="form-control"
    //                         id="message"
    //                         name="message"
    //                         ref={description}
    //                     />
    //                 </div>

    //                 <div className="mb-3">
    //                     <label>
    //                         City:<br></br>
    //                         <select className="form-control" ref={city}>
    //                             {citiesMap}
    //                         </select>
    //                     </label>
    //                 </div>


    //                 <div className="mb-3">
    //                     <label>Address</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         placeholder="Enter address of business"
    //                         required
    //                         ref={address}
    //                     />
    //                 </div>

    //                 <div className="mb-3">
    //                     <label>Phone number</label>
    //                     <input
    //                         type="number"
    //                         className="form-control"
    //                         placeholder="Enter location"
    //                         required
    //                         ref={phone}
    //                     />
    //                 </div>

    //                 <div className="mb-3">
    //                     <div id='upload-widget' className='cloudinary-button' onClick={() => handleOpenWidget()}>
    //                         Choose background image
    //                     </div>
    //                     {
    //                         backgroundPicture !== "" ?
    //                             <div className='images-preview'>
    //                                 <img src={backgroundPicture} alt="backPic"/>
    //                             </div>
    //                             :
    //                             null
    //                     }
    //                 </div>

    //                 <div className="d-grid">
    //                     <button type="submit" className="btn btn-primary">
    //                         Submit
    //                     </button>
    //                 </div>
    //             </form>
    //         </div>
    //     </Hero>
    // )
}
