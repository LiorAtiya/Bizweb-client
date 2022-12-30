import React, { Component } from 'react'
import Title from '../general/Title'
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
            },
            {
                icon: <FaBeer />,
                title: "free beer",
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
                <Title title="Top 5 ⭐" />
                <div className='services-center'>
                {this.state.services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <h6>Category: {item.title}</h6>
                            <p>{item.info} Stars</p>
                            <span>{item.icon}</span>
                        </article>
                    )
                })}
                </div>
                </section>
            </div>
        )
    }
}
