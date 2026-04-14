import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// BOARD
export const getBoard = () => API.get("/board");

// LISTS
export const createList = (data) => API.post("/lists", data);
export const updateList = (id, data) => API.put(`/lists/${id}`, data);
export const deleteList = (id) => API.delete(`/lists/${id}`);
export const reorderLists = (lists) =>
  API.put("/lists/reorder", { lists });

// CARDS
export const createCard = (data) => API.post("/cards", data);
export const updateCard = (id, data) => API.put(`/cards/${id}`, data);
export const deleteCard = (id) => API.delete(`/cards/${id}`);
export const moveCard = (data) => API.put("/cards/move", data);
export const getCardDetails = (id) => API.get(`/cards/${id}`);

export default API;