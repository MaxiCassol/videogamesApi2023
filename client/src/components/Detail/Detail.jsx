import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDetailgame }  from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = ()=>{
    const {id} = useParams();

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailgame(id))
    },[])
    const game = useSelector((state) => state.game)

    const GetPlat = () => {
        console.log(game);
        let plata = [];
        if(game.DataBase === true){
            game.platforms.map(plat =>{
                plata.push(plat)
                })
        }else{
            game.platforms.map((plat) =>{
                plata.push(plat.platform.name)
            })
        }
        plata = plata.toString().replace(/,/g, " - ")
        return(
    <div className={style.plat}>{plata}</div>
    )
    }
    return(
        <div className={style.containerDetail}>
            <NavLink className={style.backHome} to={"/home"}><img src="https://cdn-icons-png.flaticon.com/512/566/566095.png" alt="back"/></NavLink>
            {
            Object.keys(game).length !== 0 ? 
                <div>
                <h2 className={style.containerId}>ID: {game.id}</h2>
            <h1>{game.name}</h1>
            <img className={style.imageDetail} src={game.background_image} alt={game.name}/>
            <div className={style.platformDetail}>
                <h2>Plataformas: </h2>
            
                <h3><GetPlat/></h3>
            </div>
            <div className={style.genresDetail}>
                <h3>Generos:  </h3>
                <h3>{
                game.genres.map((genre) =>{
                    return <div key={genre.id} style={{display: "inline"}}> {genre.name} </div>
                })
                }</h3> 
            </div>
            <div className={style.containerDescription}>
                <h2>Descripcion:</h2>
                <h4>
                    <div dangerouslySetInnerHTML={ {__html: game.description}}/>
                </h4>
            </div>
            <div className={style.releaseDetail}>
                <h3>Fecha de lanzamiento: </h3>
                <h4>  {game.release_date === undefined ? game.released : game.release_date}</h4>
            </div>
            <div className={style.ratingDetail}>
                <h3> Rating: </h3>
                <h4>{game.rating}</h4>
            </div>
            
            </div>
            : 
            <div className={style.loadingDetail}>
                <img src="https://i.gifer.com/3F3F.gif" alt="sonic"/>
                <h1>Loading...</h1>
                <img src="https://i.gifer.com/3F3F.gif" alt="sonic"/>
                </div>
            }
            
        </div>
    )
}

export default Detail;