const { Videogame, Genres } = require('../db');
const { default: axios } = require("axios");
require('dotenv').config();
const { KEY} = process.env;

const getGamesOnDb = async () => {
    const gamesOnDb = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    })
    const gamesdb = gamesOnDb.map(v => {
        const genres = v.genres.map(type => type.name);
        return {...v.toJSON(), genres};
    })

    if (gamesdb.lenght === 0) {
        throw new Error('No se encontraron juegos en la Db')
    }
    return gamesdb;
}

  // 100 juego de api
const getGamesOnApi = async () => {
    
    //Pego a la api y traigo 20 juegos
    //(pag 1 en iterador 0 ---> 20 juegos)
    let response = await axios.get(
        `https://api.rawg.io/api/games?key=${KEY}`,//3 ---> 4
    )

    //Hago el endpoint anterior 5 veces para traerme un total de 100 juegos
    let result = [];//1, 2 ---> next 3
    for (let i = 0; i < 5; i++) {
        result = [...result, ...response.data.results];
        response = await axios.get(response.data.next);//esto se repite 5 veces. // string url
    }

    const data = result.map((el) => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            release_date: el.released,
            rating: el.rating,
            background_image: el.background_image,
            platforms: el.platforms.map((p) => p.platform.name),
            genres: el.genres.map((g) => g.name),
        }
    })
    return data;
}

    const getVideoGames = async () => {
        const apiData = await getGamesOnApi()
        const dbData = await getGamesOnDb()
        return [...apiData, ...dbData]
    }


module.exports = getVideoGames;