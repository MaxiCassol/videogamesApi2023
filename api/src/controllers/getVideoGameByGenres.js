const axios = require("axios")
const {Genres} = require("../db")
const {URL_BASE, KEY} = process.env

const getVideoGameByGenres = async () => {
    const genres = (await axios.get(`${URL_BASE}genres?key=${KEY}`)).data

    genres.results.map((g) => {
        Genres.findOrCreate({where: {name: g.name}})
    })

    const allGenres = await Genres.findAll()
    return allGenres;
}

module.exports = getVideoGameByGenres;