import React, { useRef, useState } from 'react'
import cities from '../database/cities'
import * as Components from '../styles/StyledForm';
import Business from '../components/category/Business';
import ApiRoutes from '../api/ApiRoutes';
import { useTranslation } from 'react-i18next';

export default function QuickAppointment() {
    const category = useRef("");
    const city = useRef();

    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const [availables, setAvailables] = useState([]);
    const [appointmentFlag, setAppointmentFlag] = useState(false);

    const citiesMap = cities.map((item, index) => {
        return <option value={item.name} key={index}>{item.name}</option>
    })

    const handleClick = async () => {

        setAvailables([]);

        const business = {
            category: category.current.value,
            city: city.current.value,
        }

        //Get nearest availables appointments
        ApiRoutes.findQuickAppointment(business)
            .then((res) => {
                setAvailables(res.data);
            })
            .catch((err) => console.log(err));

        setAppointmentFlag(true);
    }

    return (
        <Components.QuickAppointContainer>

            <Components.NewBusinessForm>
                <Components.Title>{t("FindNearest")}</Components.Title>
                <br />
                <div className="mb-3">
                    <label>
                        <b>{t("Category")}</b><br />
                        <Components.Select ref={category} className={i18n.language === 'he'? 'text-right' : null}>
                            <option value="Barbershop">{t("Barbershop")}</option>
                            <option value="Nail Polish">{t("Nail Polish")}</option>
                            <option value="Restaurants">{t("Restaurants")}</option>
                            <option value="Professionals">{t("Professionals")}</option>
                            <option value="Personal Trainers">{t("Personal Trainers")}</option>
                            <option value="Private Teachers">{t("Private Teachers")}</option>
                        </Components.Select>
                    </label>
                </div>

                <div className="mb-3">
                    <label>
                        <b>{t("City")}</b><br></br>
                        <Components.Select ref={city} className={i18n.language === 'he'? 'text-right' : null}>
                            {citiesMap}
                        </Components.Select>
                    </label>
                </div>

                {
                    appointmentFlag ?
                        <>
                            {
                                availables.length === 0 ?
                                    <h1>{t("NoAppointmentAvailable")}</h1>
                                    :
                                    <>
                                        <h5>{t("NearestAvailable")} <br/>{availables[1].date} , at {availables[1].time}</h5><br />
                                        <Components.AvailableContainer>
                                            <Business key={availables[0]._id} business={availables[0]} /><br />
                                        </Components.AvailableContainer>
                                    </>
                            }
                        </>
                        :
                        null
                }

                <Components.Button type="button" onClick={handleClick}>{t('Find')}</Components.Button>
            </Components.NewBusinessForm>

        </Components.QuickAppointContainer>
    )
}
