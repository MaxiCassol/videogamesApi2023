const { default: axios } = require("axios");
const { Videogame, Genres} = require("../db")
require('dotenv').config();
const { KEY, URL_BASE} = process.env;

const getVideoGameByName = async (query) => {
    const {name} = query;

    const gamesApi = (await axios.get(`${URL_BASE}games?key=${KEY}`)).data;
    console.log(name);

    const gameApi = gamesApi.results.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))

    const videogamesDb = await Videogame.findAll({
        include:{
            model: Genres,
            attibutes: ["name"],
            through: {
                attributes: []
            }    
        }
    })

    const videogameDb = videogamesDb.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()))

    const videoGameName = [...videogameDb, ...gameApi]

    return videoGameName;
}

module.exports = getVideoGameByName;