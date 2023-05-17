import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../../redux/actions";
import style from"./SearchBar.module.css"

const SearchBar = () =>{
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const handlerSearch = (name)=>{
        dispatch(getGameByName(name))
    }
    return(
        <div className={style.searchBar}>
            <input name="search" onChange={(val) =>setName(val.target.value)}></input>
            <button onClick={()=>handlerSearch(name)}>Buscar</button>
        </div>
    )
}

export default SearchBar;