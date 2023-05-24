import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { getDetailgame, deleteVideoGame, getGames }  from "../../redux/actions";
import styles from './Detail.module.css'

const { backgroundImage, loadingDetail, containerDetail, arrowBack, deleteGame, imageDetail } = styles

const Detail = ()=>{
    const {id} = useParams();
    const navigate = useNavigate ();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailgame(id))
    },[])
    const game = useSelector((state) => state.game)

    const GetPlat = () => {
        let plata = [];
        if(game.DataBase === true){
            game.platforms.map((plat) => {
                plata.push(plat)
                })
        }else{
            game.platforms.map((plat) => {
                plata.push(plat.platform.name)
            })
        }
        plata = plata.toString().replace(/,/g, " - ")
        return(
    <div className="plat">{plata}</div>
    )
    }

    const handleDeleteGame = (e) => {
                e.preventDefault()
                let resultado = window.confirm('Estas seguro que desea eliminar este juego?');
                if (resultado === true) {
                    window.alert('Juego borrado con éxito');
                    dispatch(deleteVideoGame(id));
                    // dispatch(getGames())
                    navigate(`/home`);
                    window.location.replace('');
                }
            }

    return(
        <div className={backgroundImage}>
            <NavLink className={arrowBack} to={"/home"}>
                <img src="https://cdn.icon-icons.com/icons2/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123237.png" alt="back"/>
            </NavLink>
            {
            Object.keys(game).length !== 0 
            ? 
            <div className={containerDetail}>
                <h1 className={containerDetail}>{game.name}</h1>
                <h2 className="containerId">ID: {game.id}</h2>
                
            <div className={containerDetail}>
                <h3> Rating: </h3>
                <h4>{game.rating}</h4>
            </div>
                <img 
                className={imageDetail} 
                src={game.background_image} 
                alt={game.name}/>
            <div className={containerDetail}>
                <h2>Plataformas: </h2>
            
                <h3><GetPlat/></h3>
            </div>
            <div className={containerDetail}>
                <h2>Generos:  </h2>
                <h3>{
                game.genres.map((genre) =>{
                    return <div key={genre.id} style={{display: "inline"}}> {genre.name} </div>
                })
                }</h3> 
            </div>
            <div className={containerDetail}>
                <h2>Descripcion:</h2>
                <h4>
                    <div dangerouslySetInnerHTML={ {__html: game.description}}/>
                </h4>
            </div>
            <div className={containerDetail}>
                <h3>Fecha de lanzamiento: </h3>
                <h4>  {game.release_date === undefined ? game.released : game.release_date}</h4>
            </div>
                {game.DataBase === true
                ? 
                <button className={deleteGame} onClick={(e) => handleDeleteGame(e)}>Delete game</button>
                : <h3>Este juego no se puede borrar</h3>
                } 
                <NavLink className={arrowBack} to={"/home"}>
                    <img src="https://cdn.icon-icons.com/icons2/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123237.png" alt="back"/>
                </NavLink>
            </div>
            : 
            <div className={loadingDetail}>
                <img src="https://cdn.dribbble.com/users/1253165/screenshots/3621577/media/0cc3e97033b3200c987b69b535ed3e64.gif" style={{height:"100vh"}} alt="loading"/>
                </div>
            }
        </div>
    )
}

export default Detail;