import React, { useRef, useState } from 'react'
import axios from "axios";
import cities from '../database/cities'
import * as Components from '../styles/StyledForm';
import Business from '../components/category/Business';

export default function QuickAppointment() {
    const category = useRef("");
    const city = useRef();

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
        await axios.post(`https://facework-server-production.up.railway.app/api/business/home/quickappointment`, business)
            .then((res) => {
                setAvailables(res.data);
            })
            .catch((err) => console.log(err));

        setAppointmentFlag(true);
    }

    return (
        <Components.QuickAppointContainer>

            <Components.NewBusinessForm>
                <Components.Title>Find the nearest available appointment</Components.Title>
                <br />
                <div className="mb-3">
                    <label>
                        <b>Category of business:</b><br />
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

                <div className="mb-3">
                    <label>
                        <b>City:</b><br></br>
                        <Components.Select ref={city}>
                            {citiesMap}
                        </Components.Select>
                    </label>
                </div>

                {
                    appointmentFlag ?
                        <>
                            {
                                availables.length === 0 ?
                                    <h1>No appointment available in the near future</h1>
                                    :
                                    <>
                                        <h5>Nearest Available: {availables[1].date} , at {availables[1].time}</h5><br />
                                        <Components.AvailableContainer>
                                            <Business key={availables[0]._id} business={availables[0]} /><br />
                                        </Components.AvailableContainer>
                                    </>
                            }
                        </>
                        :
                        null
                }

                <Components.Button type="button" onClick={handleClick}>Find</Components.Button>
            </Components.NewBusinessForm>

        </Components.QuickAppointContainer>
    )
}
