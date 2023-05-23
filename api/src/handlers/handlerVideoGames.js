const getVideoGameById = require("../controllers/getVideoGameById")
const postVideoGame = require("../controllers/postVideoGame")
const getVideoGameByName = require("../controllers/getVideoGameByName");
const getVideoGames = require("../controllers/getvideogame");
const editGame = require("../controllers/putVideoGame");
const deleteGame = require("../controllers/deleteVideoGame")


const handlerGetGames = async (req,res) =>{
    try {
        if(Object.keys(req.query).length === 0){
            const allGames = await getVideoGames()
            res.status(200).json(allGames)
        }else{
            const resQuery = await getVideoGameByName(req.query)
            res.status(200).json(resQuery)
        }
    } catch (error) {
        if(error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED'){
            return res.status(505).send({message:'Network error occurred' });
        };
        if(error.response && error.response.status === 401){
            return res.status(401).send({message: 'Unauthorized'});
        };
        return res.status(500).send({message: error.message});
    }
}

const handlerGetById = async (req, res) =>{
    try {
        const {idVideogame} = req.params
        const result = await getVideoGameById(idVideogame)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const handlerPostGame = async (req,res) =>{
    try {
        const postGame = await postVideoGame(req.body)
        
        // res.status(200).json({ message: `Se ha creado el juego: ${req.body.name}` })
        res.status(200).json(req.body)
    } catch (error) {
        res.status(402).send("Error!")
        console.log(error);
    }
}

const handlerEditGame = async (req, res) => {
    try {
        const editedGame = req.body
        const { id } = req.params
        const modified = await editGame(editedGame, id)
        res.status(200).json(modified)
        } catch (error) {
        res.status(404).json({ error: error.message })
        }
} 

const handlerDeleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await deleteGame(id)
        res.status(200).json({ message: `El juego "${deletedGame.name}", HA SIDO ELIMINADO` })
    } catch (error) {
        res.status(404).json({ error: 'No se pudo eliminar el juego' })
    }
}

module.exports = {handlerGetGames, handlerGetById, handlerPostGame, handlerEditGame, handlerDeleteGame}