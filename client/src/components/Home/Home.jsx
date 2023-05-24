import React from "react"
import { alfabOrder, createdFilterGame, filterByRating, getFilterByGenres, getGames, getGenres } from "../../redux/actions"
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { setPagination } from '../../redux/actions';
import "./Home.css"

const Home = () => {
    const allGenres = useSelector((state) => state.genres)
    const allVideoGames = useSelector((state) => state.videogames)
    // const allVideoGames = useSelector((state) => state.filteredVideogames);
    const { itemsPerPage, currentPage } = useSelector(
        (state) => state.pagination
    );
    const [render, setRender] = useState("")
    
    const lastPageGame = currentPage * itemsPerPage;//indice del ultimo videojuego de la pagina

    const firstGamePage = lastPageGame - itemsPerPage//indice del primer videojuego
    
    const currentGame = allVideoGames.slice(firstGamePage,lastPageGame)//videojuegos de la pagina actual desde el 1 count al ultimo
    const numPage = Math.ceil(allVideoGames.length / itemsPerPage);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGames());
        dispatch(getGenres())
    },[])

    
    const handlerFilter = (e)=>{
        e.preventDefault()
        dispatch(getFilterByGenres(e.target.value))
        // setCurrentPage(1)
        dispatch(setPagination(itemsPerPage, 1))
        
    }

    const handlerAlphabet = (e) =>{
        e.preventDefault()
        dispatch(alfabOrder(e.target.value))
        // setCurrentPage(1)
        dispatch(setPagination(itemsPerPage, 1))
        setRender(`Ordenado ${e.target.value}`)
        if(e.target.value === "default") dispatch(getGames())
    }
    const handlerCreated = (e)=>{
        e.preventDefault()
        dispatch(createdFilterGame(e.target.value))
        // setCurrentPage(1)
        dispatch(setPagination(itemsPerPage, 1))
    }
    
    const handlerRating = (e) =>{
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
        dispatch(setPagination(itemsPerPage, 1))
        setRender(`renderizado rating ${e.target.value}`)
        if(e.target.value === "all") dispatch(getGames())  
    }

    const handlePaginationChange = (newItemsPerPage, newCurrentPage) => {
        dispatch(setPagination(newItemsPerPage, newCurrentPage));
    };

return (
    <div className="container-home">
        <div className="navBar">
            <h3>Ordenar por:</h3>
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
            <h3>Filtrar por:</h3>
            <select onChange={(e)=>handlerFilter(e)} >
                <option value={"all"}>Generos Todos</option>
                {allGenres?.map((genre)=>{
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

            <SearchBar/>
            <div>
            <button>
                <NavLink className={"navLinkCreated"} to={"/About"}>Desarrollador</NavLink>
            </button>
            </div>
            <div>
                <NavLink to="/" >
                    <h3 className={"logout"}>SALIR</h3>
                </NavLink>
            </div>
        </div>
        
        <div className="navButtonCreated">
            <button>
                <NavLink  className={"navLinkCreated"} to={"/formcreated"}>Crear un video juego</NavLink>
            </button>
        </div>
        
        <div >
            <Paginado  numPage= {numPage} currentPage={currentPage} handlePaginationChange= {handlePaginationChange}/>
        </div>

        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", height:"85rem", paddingTop:"2rem"}}>
            {
                Object.keys(allVideoGames).length !== 0 
                ? currentGame.map((game) =>{
                    return(
                        <Card 
                        id={game.id}
                        name={game.name}
                        background_image={game.background_image} 
                        genres={game.createdInDb ?
                            game.genres.map((el) => el.name).join(' ') :
                            game.genres.join(' - ')
                        }
                        />
                    )
                }): <div className="cars">
                    <img src="https://cdn.dribbble.com/users/1253165/screenshots/3621577/media/0cc3e97033b3200c987b69b535ed3e64.gif" alt="loading"/>
                </div>
            }
        </div>

        <div >
            <Paginado  numPage= {numPage} currentPage={currentPage} handlePaginationChange= {handlePaginationChange}/>
        </div>
    </div>
)
}

export default Home;