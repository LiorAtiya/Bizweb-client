import React, { Component } from 'react'
import Title from '../Title'
import { FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa"

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaShuttleVan />,
                title: "free coktails",
                info: 'bla bla bla bla'
            },
            {
                icon: <FaHiking />,
                title: "free Hiking",
                info: 'bla bla bla bla'
            },
            {
                icon: <FaBeer />,
                title: "free beer",
                info: 'bla bla bla bla'
            }
        ]
    }
    render() {
        return (
            <div>
                <section className='services'>
                <Title title="Top 5 ⭐ " />
                <div className='services-center'>
                {this.state.services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    )
                })}
                </div>
                </section>
            </div>
        )
    }
}
