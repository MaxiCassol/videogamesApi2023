import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName, getGames } from "../../redux/actions";
import "./SearchBar.css"

const SearchBar = () =>{
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    
    const allVideoGames = useSelector((state) => state.videogames)

    const handlerSearch = (name)=>{
        if(name.length === 0) dispatch(getGames(allVideoGames))
        dispatch(getGameByName(name))

    }
    return(
        <div className="searchBar">
            <input name="search" onChange={(val) =>setName(val.target.value)}></input>
            <button onClick={()=>handlerSearch(name)}>Buscar</button>
        </div>
    )
}

export default SearchBar;