import { Link } from "react-router-dom";
import "./Card.css";
import React from "react";

export default function CardGames({id, backgraound_image, name, genres}) { 
   let gen= genres.toString()
   
   gen = gen.replace(/,/g, " - ")

   return (
      <div className="div">
         <Link to = {`/detail/${id}`}>
            <div>
               <img className={"imag"} src={backgraound_image} alt={name}/>
            </div>
               <h1 className={"name"}>{name}</h1>
               <h3 className={"gen"}>Genero: {gen}</h3>
         </Link>
      </div>
   );
}

