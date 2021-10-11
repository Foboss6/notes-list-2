import { BTN_CLICK_ADD } from "./constants";
import { BTN_CLICK_CANCEL } from "./constants";
import { BTN_CLICK_CHECK } from "./constants";
import { BTN_CLICK_DELETE } from "./constants";
import { BTN_CLICK_EDIT } from "./constants";
import { BTN_CLICK_SAVE } from "./constants";

export const btnClickAdd = (id) => ({
    type: BTN_CLICK_ADD,
    payload: id 
});

export const btnClickCancel = (id) => ({
    type: BTN_CLICK_CANCEL,
    payload: id 
});

export const btnClickCheck = (id) => ({
    type: BTN_CLICK_CHECK,
    payload: id 
});

export const btnClickDelete = (id) => ({
    type: BTN_CLICK_DELETE,
    payload: id 
});

export const btnClickEdit = (id) => ({
    type: BTN_CLICK_EDIT,
    payload: id 
});

export const btnClickSave = (id) => ({
    type: BTN_CLICK_SAVE,
    payload: id 
});