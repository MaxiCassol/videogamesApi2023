const {Router} = require("express")
const  handlerGenres  = require("../handlers/handlerGenres")

const genresRouter = Router()

genresRouter.get("/", handlerGenres)

module.exports = genresRouter;