import React, { useRef, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { BusinessContext } from '../context/BusinessContext'
import * as Components from '../styles/StyledForm';
import cities from '../database/cities'
import ApiClient from '../api/ApiRoutes';
import { useTranslation } from 'react-i18next';
import { openWidgetUploadImage } from '../api/cloudinary';

export default function EditBusiness() {
    let { name } = useParams();
    const context = useContext(BusinessContext)

    //get data of business
    const { getBusiness } = context;
    const business = getBusiness(name);

    const { t } = useTranslation();

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
            prevBackgroundPicture: business.backgroundPicture
        }
        
        const token = localStorage.getItem('token');
        ApiClient.updateDetailsOfBusiness(business._id, updatedDetailsBusiness, token)
            .then(res => {
                window.location.reload(false);
            })
            .catch();
    }

    return (
        <Components.NewBusinessContainer>
            {
                business ?
                    <Components.NewBusinessForm>
                        <Components.Title>{t("EditBusiness")}</Components.Title>
                        <br />
                        <b>{t("Category")}</b>
                        <Components.Select ref={category}>
                            <option value="Barbershop">{t("Barbershop")}</option>
                            <option value="Nail Polish">{t("Nail Polish")}</option>
                            <option value="Restaurants">{t("Restaurants")}</option>
                            <option value="Professionals">{t("Professionals")}</option>
                            <option value="Personal Trainers">{t("Personal Trainers")}</option>
                            <option value="Private Teachers">{t("Private Teachers")}</option>
                        </Components.Select>
                        <br />

                        <b>{t("BusinessName")}</b>
                        <Components.Input type='text' value={nameBusiness} onChange={onChangeName} />
                        <br />

                        <b>{t("Description")}</b>
                        <Components.TextArea type='textarea' value={description} onChange={onChangeDescription} />
                        <br />

                        <div className="mb-3">
                            <label>
                                <b>{t("City")}</b><br></br>
                                <Components.Select ref={city}>
                                    {citiesMap}
                                </Components.Select>
                            </label>
                        </div>

                        <b>{t("Address")}</b>
                        <Components.Input type='text' value={address || undefined} onChange={onChangeAddress} placeholder='Empty'
                        />
                        <br />

                        <b>{t("Phone")}</b>
                        <Components.Input type='number' value={phone || undefined} onChange={onChangePhone} placeholder='Empty'
                        />


                        <br />
                        <Components.ButtonPic typeof='button' id='upload-widget' className='cloudinary-button' onClick={() => openWidgetUploadImage(setBackgroundPicture)}>
                            {t("BackgroundImage")}
                        </Components.ButtonPic>
                        {
                            <Components.Pic>
                                <img src={backgroundPicture.url} alt="backPic" style={{ height: "170px", width: "200px" }} />
                            </Components.Pic>
                        }


                        <Components.Button type="button" onClick={updateDetails}>{t("Confirm")}</Components.Button>
                    </Components.NewBusinessForm>
                    :
                    null
            }

        </Components.NewBusinessContainer>
    )
}
