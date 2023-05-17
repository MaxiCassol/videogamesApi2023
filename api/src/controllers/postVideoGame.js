const {Videogame} = require("../db");
const Genres = require("../models/Genres");

const postVideoGame = async (req, res)=>{
    const {name, 
        description, 
        platforms, 
        release_date, 
        rating, 
        background_image, 
        genres
    } = req.body;

    if(!name || !description || !platforms || !background_image || !release_date || !rating || !genres){
        res.status(400).json({error:'parameters incomplete'});
    } else{
        try{
            let newGame = await Videogame.findOrCreate({
                where: {name: name},
                defaults:{
                    name, 
                    description, 
                    platforms, 
                    release_date, 
                    rating, 
                    background_image,            
                }
            })
            
            // const arrGenres = genres.split(",")
            // arrGenres.map((genre)=>{
            // newGame.addGenres(genre)})

            // res.status(200).json(newGame)

            genres.forEach(async (element) => {
                let findGenres = await Genres.findAll({where: {name: element}});
                await newGame.addGenres(findGenres)
            });

        }catch (error){
            return res.status(400).json({error:error.message})
        }
    }
}

module.exports = postVideoGame