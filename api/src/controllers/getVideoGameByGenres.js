const axios = require("axios")
const {Genres} = require("../db")
require('dotenv').config();
const {URL_BASE, KEY} = process.env

const getVideoGameByGenres = async () => {
    let allGenres = await Genres.findAll()
    if(!allGenres.length){
        const genres = (await axios.get(`${URL_BASE}genres?key=${KEY}`)).data
        genres.results.map((g) => {
                Genres.findOrCreate({where: {name: g.name}})
            })
        allGenres = await Genres.findAll();
    }
    return allGenres;
}

module.exports = getVideoGameByGenres;