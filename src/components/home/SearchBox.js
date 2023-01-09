import React from 'react';
import '../../styles/SearchBox.css'

const SearchBox = ({ searchChange }) => {
    return (
        <>
        <form className="search">
            <input
                className="search__input"
                type="text"
                id="search"
                placeholder='Quick search'
                onChange={searchChange}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
        </form>
        </>
    )
}

export default SearchBox; 