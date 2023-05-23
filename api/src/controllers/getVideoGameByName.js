require('dotenv').config();
const { KEY, URL_BASE} = process.env;

const { default: axios } = require("axios");
const { Videogame, Genres} = require("../db")


const getVideoGameByName = async (query)=>{
    const {name} = query;
    
    const games = (await axios.get(`${URL_BASE}games?key=${KEY}&search=${name}`)).data
    
    const game = games.results.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()))
    
    const dbGames = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    
    const dbgame = dbGames.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()))
    
    const nameGame = [...dbgame, ...game]
    return nameGame; 
}

module.exports = getVideoGameByName;