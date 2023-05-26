/* eslint-disable no-useless-constructor */
import React from 'react';
import perfil from './Perfil.jpg';
import linkedin from './linkedin.jpg';
import git from './git.jpg';
import style from "./About.module.css";
import { NavLink } from "react-router-dom";

class About extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.about}>
                <NavLink className={style.arrowBack} to={"/home"}>
                    <button>
                        <img src="https://cdn.icon-icons.com/icons2/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123237.png" alt="back"/>
                    </button>
                
            </NavLink>
                <img src={perfil} className={style.img} alt=""/>

                <h1>Design by: Maximiliano Cassol Montagner </h1>
                <h2>FULL STACK DEVELOPER - Soy Henry</h2>
                <hr />
                <div>
                    <h2>You can search the world of Videogames </h2>
                    <h2>create a videogame you want to add to de database</h2>
                    <h2>Hope you enjoy it!</h2>
                </div>
                
                <hr />
                <div>

                </div>
                <h2>Includes:</h2>
                <ul>
                    <li>Frontend (Javascrypt, html y css)</li>
                    <li>Backend (Javascrypt)</li>
                    <li>Database (Postgres)</li>
                    <li>Server connected with an external API</li>
                </ul>
                <hr />
                <div className={style.logos}>
                    <a href="https://www.linkedin.com/in/maximilianocassol/" target="_blank" rel="noopener noreferrer">
                    <img className={style.linkedIn} src={linkedin} alt="linkedin" />
                    </a>
                    <a href="https://github.com/MaxiCassol" target="_blank" rel="noopener noreferrer">
                    <img className={style.git} src={git} alt="github" />
                    </a>

                </div>
                
                
            </div>
        );
    }
}

export default About; 