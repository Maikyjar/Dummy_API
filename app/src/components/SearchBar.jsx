import React, { useState } from "react";
import './SearchBar.css';

export default function SearchBar({onSearch}) {
    const [tag, setTag] = useState("");

    return (
        <div className="searchBar">
            <h3 className="filter">Filter By: </h3>
            <form className="form"
                    onSubmit={(e) => {
                    e.preventDefault();
                    onSearch(tag);
                    setTag('');
                }}>
                <input
                    className="input"
                    type="text"
                    placeholder='Tag...'
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                />
                <button className="btn-search" type="submit">Search</button>
            </form>
        </div>
    );
}