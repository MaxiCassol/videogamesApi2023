import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

const LandingPage = () =>{
    
    return(
        <div className={style.landingPage}>
            <div >
            <div > <h1 className={style.welcomeLanding}>BIENVENIDO A LA APP DE VIDEOJUEGOS</h1></div>
            <Link to={"/home"} className={style.LinkIngreso}> 
            START
            </Link>
            </div>
        </div>
    )
}

export default LandingPage;