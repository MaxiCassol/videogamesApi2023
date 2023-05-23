import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
// import paginationReducer from './reducerPaginado';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const combinedReducer  = combineReducers({
//     pagination: paginationReducer,
// });


const store = createStore(
    rootReducer,
    // {pagination: paginationReducer},
    composeEnhancer(applyMiddleware(thunkMiddleware)),
    
);

export default store;
