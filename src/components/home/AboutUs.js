import React from 'react'
import Title from '../general/Title'
import Facebook from '../../images/facebook.png'
import Instagram from '../../images/instagram.png'
import Linkedin from '../../images/LinkedIn.png'
import { useTranslation } from 'react-i18next';

export default function AboutUs() {

    const { t } = useTranslation();

    return (
        <div>
            <section className='mt-3'>
                <Title title={t("LookForUs")} color="black"/>
                <div className='flex justify-between w-[10%] m-auto'>
                    <img src={Facebook} alt="Logo" style={{ height: '30px', width: '30px'}}
                        onClick={() => {
                            window.open(`https://www.facebook.com/`, '_blank');
                        }} />
                    <img src={Instagram} alt="Logo" style={{ height: '30px', width: '30px'}}
                        onClick={() => {
                            window.open(`https://www.instagram.com/`, '_blank');
                        }} />
                    <img src={Linkedin} alt="Logo" style={{ height: '30px', width: '30px'}}
                        onClick={() => {
                            window.open(`https://www.linkedin.com/in/lior-atiya-136925163/`, '_blank');
                        }} />
                </div>
                <br/>
                <h6 className='text-center'>Created By Lior Atiya Ⓒ</h6>
            </section>
        </div>
    )
}
