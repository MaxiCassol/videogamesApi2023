import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearCreatedPost } from "../../redux/actions";
import style from "./GameCreated.module.css"

const GameCreated = () =>{
    const dispatch = useDispatch()
    dispatch(clearCreatedPost())

    return (
        <div className={style.containerCreated}>
            <NavLink to={"/home"}>
                <img className={style.iconBack} src="https://cdn-icons-png.flaticon.com/512/566/566095.png" alt="back"/>
            </NavLink>
            <div className={style.congratulations}>
                <p> Felicidades, el video juego fue creado exitosamente!!</p>
            </div>
            <div className={style.imageMario}>
                <img alt="marioBros" src="https://i.gifer.com/1V8t.gif"/>
                <img alt="marioBros" src="https://i.gifer.com/1V8t.gif"/>
            </div>
        </div>
    )
}

export default GameCreated;