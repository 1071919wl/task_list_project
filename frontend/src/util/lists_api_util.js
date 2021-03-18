import axios from "axios";

export const fetchLists = (currentUserId) => {
    return axios.get(`/api/lists/${currentUserId}`)
};

export const fetchList = (userId) => {
    return axios.get(`/api/lists/${userId}`)
}

export const postList = (newList) => {
    return axios.post("/api/lists", newList)
}

export const updateList = (listId, listUpdates) => {
    return axios.patch(`/api/lists/${listId}`, listUpdates)
}

export const deleteList = (listId) => {
    return axios.delete(`/api/lists/${listId}`)
}

