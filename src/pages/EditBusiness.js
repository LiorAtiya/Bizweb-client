import React, { useRef, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { BusinessContext } from '../context/BusinessContext'
import * as Components from '../styles/StyledForm';
import cities from '../database/cities'
import ApiClient from '../api/ApiRoutes';
import { useHistory } from "react-router-dom";

export default function EditBusiness() {
    let { name } = useParams();
    const context = useContext(BusinessContext)

    //get data of business
    const { getBusiness } = context;
    const business = getBusiness(name);
    let history = useHistory();

    const [nameBusiness, setNameBusiness] = useState(name);
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [backgroundPicture, setBackgroundPicture] = useState("")

    const citiesMap = cities.map((item, index) => {
        return <option value={item.name} key={index}>{item.name}</option>
    })

    const city = useRef();
    const category = useRef("");

    useEffect(() => {
        const getResult = async () => {
            if (business) {
                setDescription(business.description)
                setAddress(business.address)
                setPhone(business.phone)
                setBackgroundPicture(business.backgroundPicture);
            }
        };
        getResult();
    }, [business]);

    const onChangeName = e => setNameBusiness(e.target.value)
    const onChangeDescription = e => setDescription(e.target.value)
    const onChangeAddress = e => setAddress(e.target.value)
    const onChangePhone = e => setPhone(e.target.value)

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

    const updateDetails = async (e) => {
        e.preventDefault();

        const updatedDetailsBusiness = {
            category: category.current.value,
            city: city.current.value,
            name: nameBusiness,
            description: description,
            address: address,
            phone: phone,
            backgroundPicture: backgroundPicture,
        }

        console.log(business)

        ApiClient.updateDetailsOfBusiness(business._id, updatedDetailsBusiness)
            .then(res => {
                history.push(`/`)
                window.location.reload(false);
            })
            .catch((err) => console.log(err));

        // //send request to server to add new business
        // ApiClient.addNewBusiness(business)
        //     // await axios.post("https://facework-server-production.up.railway.app/api/business/add", business)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.status === 200) {
        //             //add id of business to list of business of user
        //             const businessID = res.data._id;
        //             const getUserData = JSON.parse(localStorage.getItem('token'));
        //             const business = {
        //                 userID: getUserData._id,
        //                 business: businessID
        //             }

        //             ApiClient.addBusinessToUser(getUserData._id, business)
        //                 // axios.put(`https://facework-server-production.up.railway.app/api/users/${getUserData._id}/business`, business)
        //                 .then((res) => {
        //                     window.localStorage.removeItem('token');
        //                     window.localStorage.setItem("token", JSON.stringify(res.data));

        //                     history.push('/');
        //                     window.location.reload(false);
        //                 }).catch((err) => console.log(err));

        //         }
        //     }).catch((err) => console.log(err));
    }

    return (
        <Components.NewBusinessContainer>
            {
                business ?
                    <Components.NewBusinessForm>
                        <Components.Title>Edit business details </Components.Title>
                        <br />
                        <b>Category of your business:</b>
                        <Components.Select ref={category}>
                            <option value="Barbershop">Barbershop</option>
                            <option value="Nail Polish">Nail Polish</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Professionals">Professionals</option>
                            <option value="Personal Trainers">Personal Trainers</option>
                            <option value="Private Teachers">Private Teachers</option>
                        </Components.Select>
                        <br />

                        <b>Business Name</b>
                        <Components.Input type='text' value={nameBusiness} onChange={onChangeName} />
                        <br />

                        <b>Description</b>
                        <Components.TextArea type='textarea' value={description} onChange={onChangeDescription} />
                        <br />

                        <div className="mb-3">
                            <label>
                                <b>City:</b><br></br>
                                <Components.Select ref={city}>
                                    {citiesMap}
                                </Components.Select>
                            </label>
                        </div>

                        <b>Address</b>
                        <Components.Input type='text' value={address} onChange={onChangeAddress}
                        />
                        <br />

                        <b>Phone</b>
                        <Components.Input type='number' value={phone} onChange={onChangePhone}
                        />


                        <br />
                        <Components.ButtonPic id='upload-widget' className='cloudinary-button' onClick={handleOpenWidget}>
                            Change background image
                        </Components.ButtonPic>
                        {
                            <Components.Pic>
                                <img src={backgroundPicture} alt="backPic" style={{ height: "170px", width: "200px" }} />
                            </Components.Pic>
                        }


                        <Components.Button type="button" onClick={updateDetails}>Confirm</Components.Button>
                    </Components.NewBusinessForm>
                    :
                    null
            }

        </Components.NewBusinessContainer>
    )
}
