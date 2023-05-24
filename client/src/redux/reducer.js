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
    CLEAR_POST,
    SET_PAGINATION,
    DELETED_GAME,
    DELETE_STATES
} from "./actions"

const initialState = {
    videogames: [],
    genres: [],
    videogame: [],
    game: [],
    gameCreated: "",
    pagination: {  
        itemsPerPage: 15,
        currentPage: 1
    }
}

const reducer = (state = initialState, action) =>{
    
    switch (action.type){
        case GET_GAMES:
            return{
                ...state,
                videogames: action.payload,
                videogame: action.payload,
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
            const allVideoGames = state.videogame;
            const filteredArr =
                allVideoGames.filter(el => el.genres.includes(action.payload))
            return {
                ...state,
                videogame: state.videogame,
                videogames: filteredArr
            };
        
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
            return state;

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

        case SET_PAGINATION: 
            return {
                ...state,
                pagination: {
                ...state.pagination,
                itemsPerPage: action.payload.itemsPerPage,
                currentPage: action.payload.currentPage,
                },
            };

        case DELETED_GAME:
            return{
                ...state,
                videogame: action.payload
            };

        case DELETE_STATES:
            return{
                videogames: [],
                getAllVideoGames: [],
                genres: [],
                details: [],
            }
        default: return state;   
}
}

export default reducer;

