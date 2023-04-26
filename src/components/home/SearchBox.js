import React from 'react';
import '../../styles/SearchBox.css'
import { useTranslation } from 'react-i18next';

const SearchBox = ({ searchChange }) => {
    
    const { t } = useTranslation();

    return (
        <>
            <div className="input-container">
                <input
                    className="search-input"
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