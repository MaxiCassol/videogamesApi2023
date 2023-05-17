import React from "react"
import { alfabOrder, createdFilterGame, filterByRating, getFilterByGenres, getGames, getGenres } from "../../redux/actions"
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";
import CardGames from "../Card/Card";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Home.module.css"

const Home = (props) => {
    const allGenres = useSelector((state) => state.genres)
    const allVideoGames = useSelector((state) => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesperPage, setGamesPerPage] = useState(15)
    const [render, setRender] = useState("")
    const lastPageGame = currentPage * gamesperPage;

    const firstGamePage = lastPageGame - gamesperPage
    
    const currentGame = allVideoGames.slice(firstGamePage,lastPageGame)
    const numPage = allVideoGames.length / gamesperPage;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGames());
        dispatch(getGenres())
    },[dispatch])

    
    const handlerFilter = (val)=>{
        val.preventDefault()
    dispatch(getFilterByGenres(val.target.value))
    setCurrentPage(1)
    }

    const handlerAlphabet = (e) =>{
        e.preventDefault()
        dispatch(alfabOrder(e.target.value))
        setCurrentPage(1)
        setRender(`Ordenado ${e.target.value}`)
        if(e.target.value === "default") dispatch(getGames())
    }
    const handlerCreated = (e)=>{
        e.preventDefault()
        dispatch(createdFilterGame(e.target.value))
        setCurrentPage(1)
    }
    
    const handlerRating = (e) =>{
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
        setRender(`renderizado rating ${e.target.value}`)
    }
    
    const handlerDefault = (e)=>{
        e.preventDefault()
        dispatch(getGames())
        setCurrentPage(1)
    }

    
return (
    <div className={style.container}>
        
        <div className={style.navBar}>
        <SearchBar/>
        
        
        <select onChange={(e)=>handlerAlphabet(e)}>
            <option value={"default"}>Orden Alfabetico</option>
            <option value={"asd"}>Orden Ascendente</option>
            <option value={"des"}>Orden Descendente</option>
        </select>

        <select onChange={(e)=>handlerRating(e)}>
            <option value={"all"}>Rating</option>
            <option value={"Mayor-menor"}>Mayor a menor</option>
            <option value={"Menor-mayor"}>Menor a mayor</option>
        </select>
        <select onChange={(e)=>handlerFilter(e)} >
            <option value={"all"}>Generos</option>
            {
                allGenres.map((genre)=>{
                    return(
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    )
                })
            }
        </select>
        <select onChange={(e)=>handlerCreated(e)}>
            <option value={"all"}>Creados y existentes</option>
            <option value={"created"}>Creados por mi</option>
            <option value={"not_created"}>Existentes</option>
        </select>
        </div>
        
        <div className={style.buttonReset}>
            <button onClick={(e)=>handlerDefault(e)}>
                <img src="https://cdn-icons-png.flaticon.com/512/25/25051.png" alt="reset"/>
            </button>
            
            </div>
            
        <div className={style.navButtonCreated}>
        <button>
        <NavLink  className={"navLinkCreated"} to={"/formcreated"}>Crear un video juego</NavLink>
        </button>
        </div>
        
        <div>
        <Paginado numPage= {numPage} setCurrentPage={setCurrentPage}/>
        </div>
        <div>
            {
                Object.keys(allVideoGames).length !== 0 ? currentGame.map((game) =>{
                    let gen = []
                    game.genres.map((genre) => {
                        gen = [...gen, genre.name]
                    })
                
                    return(
                        <CardGames key={game.id} name={game.name} background_image={game.background_image} genres={gen} id={game.id}/>
                    )
                    
                }): <div className={style.loadingHome}>
                <img src="https://i.gifer.com/3F3F.gif" alt="sonic"/>
                <h1>Loading...</h1>
                <img src="https://i.gifer.com/3F3F.gif" alt="sonic"/>
                </div>
            }
        </div>
        

    </div>
)
}

export default Home;