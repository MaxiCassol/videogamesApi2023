const axios = require("axios");
const { Videogame, Genres } = require("../db") 
require("dotenv").config()
const { KEY, URL_BASE} = process.env;

const getVideoGameById = async (idGame) => {
    if(idGame.includes("-")){
        const videogamesDb = await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        const videogameDb = videogamesDb.find((e) => e.id === idGame) !== undefined ? videogamesDb.find((e) => e.id === idGame) : "no hay coincidencias"
        return videogameDb
    }else{
        try {
            const videogamesApi = (await axios.get(`${URL_BASE}games/${idGame}?key=${KEY}`)).data
            return videogamesApi;
        } catch (error) {
            console.log("no se realizo la peticion");
        }
    }
}

module.exports = getVideoGameById;