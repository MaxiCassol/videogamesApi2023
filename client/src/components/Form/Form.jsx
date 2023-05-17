import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import { getGenres } from "../../redux/actions";
import  handlerInput  from "../handlersForm/handlerInput";
import style from  "./StyleForm.module.css"
import { postVideogame } from "../../redux/actions";

const Form = () =>{
    const navigate = useNavigate()
    const genres = useSelector((state) => state.genres)
    const gameCreated = useSelector((state) => state.gameCreated) 
    const dispatch = useDispatch()

    const [genre, setGenre] = useState([{
        id: "",
        name: ""

    }])

    const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    release_date: "",
    rating: "",
    genres: ""

    })
    const [condition, setCondition] = useState("")
    useEffect(()=>{
    if(gameCreated === "VideoGame created successfully" && condition === ""){
        navigate("/created")
        
    }if(gameCreated === "Error"){
    alert("se produjo un error al procesar su solicitud")
    }
    },[gameCreated])

    useEffect(()=>{
        dispatch(getGenres())
        },[dispatch])
    
    
    const handlerSubmit = (e)=>{
        e.preventDefault()
        if(form.name === "") setCondition("Debe llenar el campo nombre")

        else if(form.background_image === "") setCondition("Debe llenar el campo imagen")
        
        else if(form.description === "") setCondition("Debe llenar el campo descripción")
        
        else if(form.platforms.length === 0) setCondition("Debe seleccionar una o mas plataformas")
        
        else if(form.rating === "") setCondition("Debe seleccionar el rating entre 1 y 5")
        
        else if(form.genres === "") setCondition("Debe seleccionar uno o mas generos")
        
        else if(form.release_date.toString().length !== 10) {setCondition("Debe seleccionar la fecha correspondiente") 
        }
        else setCondition("")

        if(condition === ""){
        dispatch(postVideogame(form))
        }else{
            alert(condition)
        }
    }

    const handlerGenre = (e) =>{
        if(e.target.value !== "allGenre"){
                setCondition("")

            const dupli = genre.find((gen) => gen.id === Number(e.target.value))
        if(!dupli){
            const filtrado = genres.filter((fil) => fil.id === Number(e.target.value))
            setGenre(
                [...genre,{
                id: filtrado[0].id,
                name: filtrado[0].name
                }])

        let idGenre = [];
        idGenre.push(filtrado[0].id)

        idGenre = idGenre.toString();
        
        setForm({
            ...form,
            genres: filtrado[0].id + "," + form.genres
        })
        }}
    }

    const handlerDeleteGen=(e)=>{
            e.preventDefault()
            const filterGen = genre.filter((ele) => Number(ele.id) !== Number(e.target.value))
            
            setGenre(filterGen)
        
            let idNew = [];
            filterGen.map((ele) => {
                idNew.push(ele.id)
            })
        
            idNew = idNew.toString().slice(1)
            
            setForm({
                ...form,
                genres: idNew
        })
    }   

    const handlerPlatforms = (e) =>{
        e.preventDefault()
        const comprobation = form.platforms.find(plat => plat === e.target.value)
        if(e.target.value !== "platform" && !comprobation) { 
            setCondition("")
            let platform = [e.target.value, ...form.platforms]
            setForm({
                ...form,
                platforms: platform
            })
        }
    }

    const handlerDeletePlat = (e) =>{
        const filterPlat = form.platforms.filter((plat) => plat !== e.target.value)
        setForm({
            ...form,
            platforms: filterPlat
        })
    }


    return(
        <div className={"containerForm"}>
            <h2>
                CREA UN VIDEOJUEGO
            </h2>
            <div>
                <NavLink to={"/home"} className={"navHome"}><img src="https://cdn-icons-png.flaticon.com/512/566/566095.png" alt="back"/></NavLink>
            </div>
            <div className={style.containerData}>
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
            <div className={style.containerSelecPlat}>
                <label htmlFor="platform">Plataforma: </label>
            <select id="platform" onClick={(e)=> handlerPlatforms(e)} >
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
                    genres.map((genre) =>{
                        return <option key={genre.id} value={genre.id} defaultValue={"allGenre"}>{genre.name}</option>
                    })
                }
            </select>
            </div>
            <div>
                <button type="submit" value={"crear"} onClick={(e)=>handlerSubmit(e)}>Crear Videojuego</button>
            </div>
            </div>
            <div>
            <div className={style.condition}>
                <div>{ condition}</div> 
            </div>
            <div className={style.containerPlat}>
                <h3>Plataformas seleccionadas: </h3>
            {form.platforms.map((plat)=>{
                return <div key={plat}> {plat}<button value={plat} onClick={(e) => handlerDeletePlat(e)}>Eliminar </button> </div>
            })}
            </div>
            <div className={style.containerGenre}>
                <h3>Generos seleccionados:  </h3>
                {
                    genre.map((gen)=>{
                        if(gen.name !== ""){
                        return(
                        
                        <div key={gen.id} style={{display: "inline", margin: "10px"}}>{gen.name}   
                        <button value={gen.id} onClick={(e)=>handlerDeleteGen(e)}>Eliminar</button></div> 
                        ) }
                    })
                }
            </div>
            </div>  
        </div>
    )
}

export default Form;