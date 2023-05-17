import { 
    GET_BY_NAME, 
    GET_GAMES, 
    GET_GENRES, 
    FILTER_GENRES, 
    ALFA_ORDER, 
    FILTER_CREATED, 
    FILTER_RATING, 
    DETAIL_GAME, 
    POST_GAME, 
    CLEAR_POST 
} from "./actions"

const initialState = {
    videogames: [],
    genres: [],
    videogame: [],
    game: [],
    gameCreated: ""
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_GAMES:
            return{
                ...state,
                videogames: action.payload,
                videogame: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case FILTER_GENRES:
            const gameGenres = state.videogame
            
            let filter= []
            if(action.payload !== "all"){
            for(let i = 0; gameGenres.length > i; i++){
                for(let j = 0; gameGenres[i].genres.length > j; j++){
                    if(gameGenres[i].genres[j].name.includes(action.payload)){
                        filter.push(gameGenres[i])
                    }
                }
            }
            return{
                ...state,
                videogames: filter
            }
        }else{
            return{
                ...state,
                videogames: state.videogame
            }
        }
        case ALFA_ORDER:
            const asd = state.videogames.sort((x,y)=> x.name.localeCompare(y.name))
            
            if(action.payload === "asd"){
                return{
                    ...state,
                    videogames: asd
                }
            }else if(action.payload === "des"){
                const des = asd.reverse()
                return{
                    ...state,
                    videogames: des
                }
            }
        case FILTER_CREATED:
            const allGames = state.videogame
            let game = []
            if(action.payload === "created"){
                game = allGames.filter((game) => game.DataBase === true);
            }else if(action.payload === "not_created"){
                game = allGames.filter((game) => game.DataBase === undefined);
            }else{
                game = allGames
            }
            return{
                ...state,
                videogames: game
            }
        case FILTER_RATING: 
            let allGame = state.videogame;

            if(action.payload === "Mayor-menor"){
                
                allGame = state.videogames.sort((x,y) => y.rating - x.rating)
            }else if(action.payload === "Menor-mayor"){
                
                allGame = state.videogames.sort((x,y) => x.rating - y.rating)
            }
            return{
                ...state,
                videogames: allGame
            }
        case DETAIL_GAME:
            return{
                ...state,
                game: action.payload
            }
        case POST_GAME:
            return{
                ...state,
                gameCreated: action.payload
            }
        case CLEAR_POST: 
            return{
                ...state,
                gameCreated: action.payload
            }
            default: return state;   
}


}
export default reducer;

