import { Link } from "react-router-dom";
import "./Card.css";
import React from "react";

export default function CardGames({id, background_image, name, genres}) { 
   // console.log(genres);
   // let gen= genres.toString().replace(/,/g, " - ")
   
   return (
      <div className="div">
         <Link to = {`/detail/${id}`}>
            <div > 
               <img className={"imag"} src={background_image} alt={name}/>
            </div>
               <h1 className={"name"}>{name?.length > 13 ? name.slice(0, 13) : name}</h1>
               <div className={"gen"}>
                  <h3>Genero: </h3>
                  <>{genres}</>
               </div>
         </Link>
      </div>
   );
}

