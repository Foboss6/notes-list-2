import { CHANGE_SEARCH_FIELD } from "./constants";

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

export const setBtnClickDelete = (id) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: id 
});