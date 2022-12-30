import React from 'react'
import Title from '../general/Title'
import Facebook from '../../images/facebook.png'
import Instagram from '../../images/instagram.png'
import Tiktok from '../../images/tiktok.png'

export default function AboutUs() {
    return (
        <div>
            <section className='aboutus'>
                <Title title="Look For Us" color="black" />
                <div className='aboutus-images'>
                    <img src={Facebook} alt="Logo" style={{ height: '60px', width: '60px', marginRight: "30px" }}
                        onClick={() => {
                            window.open(`https://www.facebook.com/`, '_blank');
                        }} />
                    <img src={Instagram} alt="Logo" style={{ height: '60px', width: '60px', marginRight: "30px" }}
                        onClick={() => {
                            window.open(`https://www.instagram.com/`, '_blank');
                        }} />
                    <img src={Tiktok} alt="Logo" style={{ height: '60px', width: '60px', marginRight: "30px" }}
                        onClick={() => {
                            window.open(`https://www.tiktok.com/`, '_blank');
                        }} />
                </div>
                <br/><br/>
                <h6>Created By Lior Atiya Ⓒ</h6>
            </section>
        </div>
    )
}
