const {Videogame, Genres } = require("../db.js")

const postVideoGame = async (body)=>{
   
    const {name, description, platforms, release_date, rating, background_image, genres} = body;
    let [newGame, created] = await Videogame.findOrCreate({
        where:{
            name:name
        }, defaults:{
        description: description, 
        platforms: platforms, 
        release_date: release_date, 
        rating: rating, 
        background_image: background_image,
        name: name
    }})

    const allGenres = await Genres.findAll({
        where:{
            name: genres
        }
    });
    
    await newGame.addGenres(allGenres);
    await newGame.reload();

    return "VideoGame created successfully"
}

module.exports = postVideoGame;