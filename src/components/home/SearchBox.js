import React, { useState } from 'react';
import '../../styles/SearchBox.css'
import { useTranslation } from 'react-i18next';

const SearchBox = ({ searchChange }) => {
    
    const { t } = useTranslation();
    const [language,setLanguage] = useState(localStorage.getItem('language'))

    return (
        <>
            <div className="input-container">
                <input
                    className={`rounded-full bg-white p-4 w-[95%] outline-none ${language === 'he'? 'text-right' : null}`}
                    type="text"
                    id="search"
                    placeholder={t("QuickSearch")}
                    onChange={searchChange}
                />
                <div className='search-btn'>
                    <i className="search-icon fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </>
    )
}

export default SearchBox; 