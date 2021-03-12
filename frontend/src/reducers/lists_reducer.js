import { RECEIVE_LISTS, RECEIVE_LIST, REMOVE_LIST } from "../actions/list_actions";



const ListsReducer = (state={}, action) =>  {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_LISTS:
            return action.lists;
        case RECEIVE_LIST:
            newState[action.list._id] = action.list
            return newState
        case REMOVE_LIST: 
            let listId = action.list._id
            delete newState[listId]
            return newState
        default:
            return state;
    }
}

export default ListsReducer; 