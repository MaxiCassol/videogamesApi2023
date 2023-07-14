import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import  handlerInput  from "../handlersForm/handlerInput";
import style from  "./StyleForm.module.css"
import { getGenres, postVideogame } from "../../redux/actions";


const Form = () =>{
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    release_date: "",
    rating: "",
    genres:[]
    })

    const [condition, setCondition] = useState("")

    useEffect(()=>{
        dispatch(getGenres())
        },[dispatch])
    
    
    const handlerSubmit = async (e)=>{
        e.preventDefault();
        if(form.name.trim() === "" || form.name.length <= 2) setCondition("Debe llenar el campo nombre")

        else if(form.background_image === "") setCondition("Debe llenar el campo imagen")
        
        else if(form.description.trim() === "") setCondition("Debe llenar el campo descripción")

        else if(form.rating === "") setCondition("Debe seleccionar el rating entre 1 y 5")
        
        else if(form.release_date.toString().length !== 10) {setCondition("Debe seleccionar la fecha correspondiente")}

        else if(form.platforms.length === 0) setCondition("Debe seleccionar una o mas plataformas")

        else if(form.genres.length === 0) setCondition("Debe seleccionar uno o mas generos")
        
        else {
        dispatch(postVideogame(form))
        setCondition("")
        setForm({
            name: "",
            description: "",
            released: "",
            rating: 0,
            background_image: "",
            platforms: [],
            genres: [],
        });
        
        alert("Video Game creado con exito")
        navigate("/home")
        }
    }

    const handlerGenre = (e) => {
        e.preventDefault();
        //busco si esta repetido
        const comprobation = form.genres.find(gen => gen === e.target.value)
        if(e.target.value !== "allGenre" && !comprobation) { 
            setCondition("")
            setForm({ ...form, genres: [...form.genres, e.target.value] });
            e.target.value = "allGenre";
        }
    };

    const handlerDeleteGen = (e) => {
        const filterGen = form.genres.filter((gen) => gen !== e.target.value)
        setForm({
            ...form,
            genres: filterGen
        })
    }   

    const handlerPlatforms = (e) =>{
        e.preventDefault()
        //busco si esta repetido
        const comprobation = form.platforms.find(plat => plat === e.target.value)
        if(e.target.value !== "platform" && !comprobation) { 
            setCondition("")
            setForm({...form, platforms: [...form.platforms, e.target.value]
            })
            e.target.value = "platform";
        }
    }

    const handlerDeletePlat = (e) =>{
        const filterPlat = form.platforms.filter((plat) => plat !== e.target.value)
        setForm({
            ...form,
            platforms: filterPlat
        })
    }

    const {containerForm, containerData, containerSelecPlat, containerPlat, containerGenre, condicion, navHome} = style

    return(
        <div className={containerForm }>
            <h2>
                CREA UN VIDEOJUEGO
            </h2>
            <div>
                <NavLink to={"/home"} className={navHome}><img src="https://cdn-icons-png.flaticon.com/512/566/566095.png" alt="back"/></NavLink>
            </div>
            <div className={containerData}>
                <form onChange={(e) =>handlerInput(e, setForm, form, setCondition)}>
                    <div>
                        <label htmlFor="name">Nombre: </label>
                        <input name="name" placeholder="Nombre del juego..." id="name" defaultValue={form.name} type="text" ></input>
                    </div>
                    <div>
                        <label htmlFor="image">Imagen: </label>
                        <input name="background_image" placeholder="URL de imagen" id="image" defaultValue={form.background_image}></input>
                    </div>
                    <div>
                        <label htmlFor="description">Descripcion: </label>
                        <textarea defaultValue={form.description} placeholder="Descripcion del juego..." id="description" name="description" ></textarea>
                    </div>
                    <div>
                        <label htmlFor="rating">Rating: </label>
                        <input defaultValue={form.rating} type="number" id="rating" placeholder="Entre 1 y 5" name="rating"></input>
                    </div>
                    <div>
                        <label htmlFor="released">Fecha de lanzamiento: </label>
                        <input type={"date"} defaultValue={form.release_date} name="release_date" id="released"></input>
                    </div> 
                    <div className={containerSelecPlat}>
                        <label htmlFor="platform">Plataforma: </label>
                        <select 
                        id="platform" 
                        onClick={(e)=> handlerPlatforms(e)} >
                            <option value={"platform"}>Plataforma</option>
                            <option value={"Microsoft Windows"}>Microsoft Windows</option>
                            <option value={"Linux"}>Linux</option>
                            <option value={"macOS"}>macOS</option>
                            <option value={"PlayStation 5"}>PlayStation 5</option>
                            <option value={"PlayStation 4"}>PlayStation 4</option>
                            <option value={"PlayStation 3"}>PlayStation 3</option>
                            <option value={"PlayStation 2"}>PlayStation 2</option>
                            <option value={"Xbox 360"}>Xbox 360</option>
                            <option value={"Xbox Series S/X"}>Xbox Series S/X</option>
                            <option value={"Xbox One"}>Xbox One</option>
                            <option value={"Nintendo Switch"}>Nintendo Switch</option>
                            <option value={"Android"}>Android</option>
                            <option value={"iOS"}>iOS</option>
                            <option value={"SteamOS"}>SteamOS</option>
                        </select>
                    </div>
                </form>
                <div>
                    <label htmlFor="genre">Generos: </label>
                    <select id="genre" onChange={(e)=>handlerGenre(e)}>
                        <option value={"allGenre"}>Generos</option>
                        {
                            genres.map((genre, index) =>{
                                return <option key={index} value={genre.name} defaultValue={"allGenre"}>{genre.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <button type="submit" value={"crear"} onClick={(e)=>handlerSubmit(e)}>Crear Videojuego</button>
                </div>
            </div>
            <div>


            <div className={condicion}>
                <div>{condition}</div> 
            </div>
                <div className={containerPlat}>
                    <h3>Plataformas seleccionadas: </h3>
                    {form.platforms.map((plat)=>{
                    return <div key={plat}> {plat}
                    <button value={plat} onClick={(e) => handlerDeletePlat(e)} style={{color:"white", backgroundColor:"red"}}> X </button> 
                    </div>})}
                </div>
                <div className={containerGenre}>
                    <h3>Generos seleccionados:  </h3>
                    {form.genres.map((gen) => {
                        return <div key={gen} style={{display: "inline", margin: "10px"}}> {gen}   
                        <button value={gen} onClick={(e) => handlerDeleteGen(e)} style={{color:"white", backgroundColor:"red"}}> X </button>
                        </div> 
                        })
                    }
                </div>
            </div> 
        </div>
    )
}

export default Form;