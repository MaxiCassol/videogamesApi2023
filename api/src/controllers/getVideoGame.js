const { Videogame, Genres } = require('../db');
const { default: axios } = require("axios");
require('dotenv').config();
const { KEY, URL_BASE} = process.env;

const getVideoGames = async() => {
    const videogamesApi = (await axios.get(`${URL_BASE}games?key=${KEY}`)).data;
    const videogamesDb= await Videogame.findAll({
        include: {
            model: Genres,
            attributes : ["name"],
            through: {
                attributes: []
            }
        }
    })
    const allGames = [...videogamesApi.results, videogamesDb]
    return allGames;
    
};

module.exports = getVideoGames;