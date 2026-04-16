import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5100",
});

console.log("API URL:", process.env.REACT_APP_API_URL );
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
export const addMemberToCard = (cardId, memberId) =>
  API.post("/cards/add-member", { cardId, memberId });

// LABELS
export const addLabel = (cardId, labelId) =>
  API.post(`/cards/${cardId}/labels/${labelId}`);

export const removeLabel = (cardId, labelId) =>
  API.delete(`/cards/${cardId}/labels/${labelId}`);
export const getLabels = () => API.get("/meta/labels");

//SEARCH
export const searchCards = (query) =>
  API.get(`/search?query=${query}`);

// CHECKLIST
export const addChecklistItem = (cardId, text) =>
  API.post("/checklist", { cardId, text });

export const toggleChecklistItem = (id) =>
  API.put(`/checklist/${id}`);

export const deleteChecklistItem = (id) =>
  API.delete(`/checklist/${id}`);

export default API;