import axios from "axios"

export const GET_GAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const FILTER_GENRES = "GET_FILTER_BY_GENRES";
export const ALFA_ORDER = "ALPHABET_ORDER";
export const FILTER_CREATED = "FILTER_CREATED_VIDEOGAMES";
export const FILTER_RATING = "FILTER_BY_RATING";
export const DETAIL_GAME = "GET_DETAIL_VIDEOGAME";
export const POST_GAME= "POST_VIDEOGAME";
export const CLEAR_POST = "CLEAR_CREATED_VIDEOGAME";

export const getGames = () => {
    return async function (dispatch) {
        let info = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_GAMES,
            payload: info.data
        })
    }
}

export const getGameByName = (name) => {
    return async function(dispatch){
        try {
            const info = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: GET_BY_NAME,
            payload: info.data
        })
        } catch (error) {
            console.log({error: error.message});
        }
    }
}

export const getGenres = () => {
    return async function(dispatch){
        const allGenres = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: GET_GENRES,
            payload: allGenres.data
        })
    }
}

export const getFilterByGenres = (genre) =>{
    return{
        type: FILTER_GENRES,
        payload: genre
    }
}

export const alfabOrder = (order) => {
    return{
        type: ALFA_ORDER,
        payload: order
    }
}

export const createdFilterGame = (value) => {
    return{
        type: FILTER_CREATED,
        payload: value
    }
}

export const filterByRating = (value) => {
    return {
        type: FILTER_RATING,
        payload: value
    }
}

export const getDetailgame = (value) => {
    return async function(dispatch){
        const gameById = await axios.get(`http://localhost:3001/videogames/${value}`)
        
        return dispatch({
        type: DETAIL_GAME,
        payload: gameById.data
        })
    }
}

export const postVideogame = (res) => {
    return async function (dispatch){
        const resp = await axios.post("http://localhost:3001/videogames",res)
        
        return dispatch({
            type: POST_GAME,
            payload: resp.data
        })
    }
}

export const clearCreatedPost = () =>{
    return{
        type: CLEAR_POST,
        payload: ""
    }
}
