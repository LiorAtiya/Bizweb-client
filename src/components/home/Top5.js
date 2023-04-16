import React, { useState, useEffect } from 'react';
import Title from '../general/Title'
import Business from '../category/Business'
import ApiClient from '../../api/ApiRoutes';

export default function Top5() {

    const [top5, setTop5] = useState([]);

    useEffect(() => {
        const getResult = async () => {
            //gets all events of business
            ApiClient.getTop5()
                .then((res) => setTop5(res.data))
                .catch((err) => console.log(err));
        };
        getResult();
    }, []);

    return (
        <div>
            <section className='services'>
                <Title title="Top 5 ⭐" color="white"/>
                <div className='services-center'>
                    {top5.map((item, index) => {
                        return (
                            <article key={index} className="service">
                                <h6>{item.category}</h6>
                                <p>{item.totalStars} ⭐</p>
                                <Business key={item._id} business={item} />
                            </article>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
