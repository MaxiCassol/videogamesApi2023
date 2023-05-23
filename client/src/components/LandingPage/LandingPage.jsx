import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () =>{
    
    return(
        <div className="landingPage">
            <div >
                <div className="welcomeLanding"> 
                    <h1 >BIENVENIDO A LA APP DE VIDEOJUEGOS</h1>
                </div>
            <Link to={"/home"} > 
                <button className="button">
                    START
                </button>
            </Link>
            </div>
        </div>
    )
}

export default LandingPage;