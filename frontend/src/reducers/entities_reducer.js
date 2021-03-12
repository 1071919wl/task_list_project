import { combineReducers } from 'redux'; 
import userReducer from "./user_reducer"; 
import ListsReducer from "./lists_reducer"; 


export default combineReducers ({
    currentUser: userReducer,
    lists: ListsReducer
});