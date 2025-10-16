import { useState, useEffect } from "react";
import "./InputSearch.css"

import { CiSearch } from "react-icons/ci";

const InputSearch = () => {
    return (
       <div className="container_search">
            <CiSearch className="iconSearch"/>
            <input type="text" className="inputSearch" placeholder="Buscar productos..."/>
            <button className="buttonSearch">Buscar</button>
       </div>
    )
}

export default InputSearch;