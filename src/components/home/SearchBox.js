import React from 'react';
import '../../styles/SearchBox.css'

const SearchBox = ({ searchChange }) => {
    return (
        <>
            <div className="input-container">
                <input
                    className="search-input"
                    type="text"
                    id="search"
                    placeholder='Quick search'
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