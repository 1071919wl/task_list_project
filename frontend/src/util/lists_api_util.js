import axios from "axios";

export const fetchLists = () => {
    return axios.get("/api/lists")
};

// export const fetchOrder = (orderId) => {
//     return axios.get(`/api/orders/${orderId}`)
// }

export const postList = (newList) => {
    return axios.post("/api/lists", newList)
}

export const updateList = (listId, listUpdates) => {
    return axios.patch(`/api/lists/${listId}`, listUpdates)
}

export const deleteList = (listId) => {
    return axios.delete(`/api/lists/${listId}`)
}

