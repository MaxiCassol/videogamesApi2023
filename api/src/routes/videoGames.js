const { Router } = require('express');
const { handlerGetGames, handlerGetById, handlerPostGame, handlerEditGame, handlerDeleteGame } = require("../handlers/handlerVideoGames");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

videogamesRouter.get("/", handlerGetGames)

videogamesRouter.get("/:idVideogame", handlerGetById)

videogamesRouter.post("/", handlerPostGame)

videogamesRouter.put('/:id', handlerEditGame)

videogamesRouter.delete('/:id', handlerDeleteGame)

module.exports = videogamesRouter