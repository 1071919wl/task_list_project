import { RECEIVE_LISTS, RECEIVE_LIST, REMOVE_LIST, CLEAR_LISTS } from "../actions/list_actions";



const ListsReducer = (state={}, action) =>  {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_LISTS:
            return action.lists;
        case RECEIVE_LIST:
            // newState['hello'] = action.list
            return action.list
            // return newState
        case REMOVE_LIST: 
            let listId = action.list._id
            delete newState[listId]
            return newState
        case CLEAR_LISTS:
            return [];    
        default:
            return state;
    }
}

export default ListsReducer; 