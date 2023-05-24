import {React } from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { clearCreatedPost, getGames } from "../../redux/actions";
import style from "./GameCreated.module.css"

const GameCreated = () =>{
    // const dispatch = useDispatch()
    // dispatch(clearCreatedPost())
    // useEffect(() => {
    //     // Llama a la acción para obtener todos los juegos
    //     dispatch(getGames());
    // }, [dispatch]);

    return (
        <div className={style.containerCreated}>
            <NavLink to={"/home"}>
                <img className={style.iconBack} src="https://cdn-icons-png.flaticon.com/512/566/566095.png" alt="back"/>
            </NavLink>
            <div className={style.congratulations}>
                <p> Video juego creado exitosamente!!!</p>
            </div>
            <div className={style.videoo}>
                <video autoPlay="true" muted loop="false" className={style.video}>
                <source src="https://st3.depositphotos.com/14051716/18813/v/600/depositphotos_188139700-stock-video-retro-videogame-well-done-text.mp4" type="video/mp4"/>
                </video>
                
            </div>
        </div>
    )
}

export default GameCreated;