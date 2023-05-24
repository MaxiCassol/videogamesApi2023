const { Videogame, Genres } = require('../db');

const editGame = async (game, id) => {
    try {
        const { name, description, platforms, genres } = game;
        
        const editedGame = await Videogame.update({
            name: name,
            description: description,
            platforms: platforms,
            genres: genres,
        },
            {
            where: {
                id: id,
    
            },
        })

        if (!editedGame) {
            throw new Error('No se encuentra el juego solicitado')
        }
    
        const gameUpdated = await Videogame.findOne({
            where: {
            id: id,
            }
        })
    
        await genres.forEach(async (el) => {
            let genreFinded = await Genres.findOne({
            where: {
                name: el,
            },
            });
            const gameFinded = await Videogame.findOne({
            where: {
                id: id,
            },
            include: [Genres],
            })
            await gameFinded.setGenres([])
            await gameUpdated.addGenre(genreFinded);
        })
    
        return {
            message: 'Juego modificado con éxito!',
            result: gameUpdated
        }
        } catch (error) {
            console.log(error);
        // throw new Error('No se pudo modificar el juego')
        throw new Error(error)
        }
    }

module.exports = editGame;