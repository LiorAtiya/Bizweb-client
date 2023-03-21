import React from 'react'
import Title from '../general/Title'
import Facebook from '../../images/facebook.png'
import Instagram from '../../images/instagram.png'
import Linkedin from '../../images/LinkedIn.png'

export default function AboutUs() {
    return (
        <div>
            <section className='aboutus'>
                <Title title="Look For Us" color="black" />
                <div className='aboutus-images'>
                    <img src={Facebook} alt="Logo" style={{ height: '30px', width: '30px', marginRight: "25px" }}
                        onClick={() => {
                            window.open(`https://www.facebook.com/`, '_blank');
                        }} />
                    <img src={Instagram} alt="Logo" style={{ height: '30px', width: '30px', marginRight: "25px" }}
                        onClick={() => {
                            window.open(`https://www.instagram.com/`, '_blank');
                        }} />
                    <img src={Linkedin} alt="Logo" style={{ height: '30px', width: '30px', marginRight: "25px" }}
                        onClick={() => {
                            window.open(`https://www.linkedin.com/in/lior-atiya-136925163/`, '_blank');
                        }} />
                </div>
                <br/>
                <h6>Created By Lior Atiya Ⓒ</h6>
            </section>
        </div>
    )
}
