const getVideoGameByGenres = require("../controllers/getVideoGameByGenres")

const handlerGenres = async (req, res) =>{
    const genres = await getVideoGameByGenres();
    res.status(200).json(genres)
}

module.exports = handlerGenres;