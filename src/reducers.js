import { BTN_CLICK } from "./constants";
import { BTN_CLICK_ADD } from "./constants";
import { BTN_CLICK_CANCEL } from "./constants";
import { BTN_CLICK_CHECK } from "./constants";
import { BTN_CLICK_DELETE } from "./constants";
import { BTN_CLICK_EDIT } from "./constants";
import { BTN_CLICK_SAVE } from "./constants";

import { INPUT_CHANGE } from "./constants";

import Select from "./components/inputs/Select";
import Input from "./components/inputs/Input";


const defaultInputs = {
    'select-new-cathegory': {
        id: 'cathegory',
        value: 'Task',
    },
}

export const initialState = {
    btnClickAdd: '',
    btnClickCheck: '',
    btnClickCancel: '',
    btnClickDelete: '',
    btnClickEdit: '',
    btnClickSave: '',
    inputs: defaultInputs,
    notes: {
        111: {
            id: 111,
            cathegory: "Task",
            name: "shopping",
            content: "buy: pasta, oil, bread. 11/10/2021",
            created: "07/10/2021",
            dates: "11/10/2021",
        },
        222: {
            id: 222,
            cathegory: "Random Thought",
            name: "For me",
            content: "Don't warry, be happy!",
            created: "08/10/2021",
            dates: "",
        },
        333: {
            id: 333,
            cathegory: "Idea",
            name: "Project",
            content: "use CSS Grid in my case",
            created: "06/10/2021",
            dates: "",
        },
        444: {
            id: 444,
            cathegory: "Random Thought",
            name: "",
            content: "If you get 'scared half to death' twice, do you die?",
            created: "07/10/2021",
            dates: "",
        },
        555: {
            id: 555,
            cathegory: "Random Thought",
            name: "",
            content: "Who decided to put \"s\" into lisp?!",
            created: "11/10/2021",
            dates: "",
        },
        666: {
            id: 666,
            cathegory: "Random Thought",
            name: "",
            content: "In order to sleep we first pretend to sleep",
            created: "03/10/2021",
            dates: "",
        },
        777: {
            id: 777,
            cathegory: "Task",
            name: "Cleaning",
            content: "Clean whole the flat. Start on 10/10/2021",
            created: "09/10/2021",
            dates: "10/10/2021",
        },
    },
    archivedNotes: {
        11112: {
            id: 11112,
            cathegory: "Task",
            name: "shopping",
            content: "buy: pasta, oil, bread. 11/10/2021",
            created: "07/10/2021",
            dates: "11/10/2021",
        },
        22212: {
            id: 22212,
            cathegory: "Random Thought",
            name: "For me",
            content: "Don't warry, be happy!",
            created: "08/10/2021",
            dates: "",
        },
    },
    summary: {
        "Task": {
            id: "Task",
            cathegory: "Task",
            active: 2,
            archived: 1,
        },
        "Idea": {
            id: "Idea",
            cathegory: "Idea",
            active: 1,
            archived: 0,
        },
        "Random Thought": {
            id: "Random Thought",
            cathegory: "Random Thought",
            active: 4,
            archived: 1,
        },
    },
    showArhivedNotes: false,
}

const newNoteForm = {
    id: 'new', 
    cathegory: 
        <Select id='new'/>,
    name: 
        <Input id='new-name' placeholder='name' />,
    content: 
        <Input id='new-content' placeholder='note' />,
        created: '',
        dates: '',
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case BTN_CLICK : {
            return {
                ...state,
                showArhivedNotes: !state.showArhivedNotes,
            }
        }
        
        case BTN_CLICK_ADD :
            
            return {
                ...state, 
                btnClickAdd: action.payload,
                notes: {
                    ...state.notes,
                    [newNoteForm.id]: {
                        ...newNoteForm,
                    }
                },
            }

        case BTN_CLICK_SAVE :
            let newNote = {};
            let updatedNotes = {};
            const date = new Date();
            const dates = state.inputs['input-new-content'] ? [...state.inputs['input-new-content'].value.matchAll(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)] : [];

            if(action.payload.includes('new')) {
                // check the content field, it must be not empty
                if(!state.inputs['input-new-content']) {
                    return {
                        ...state,
                        btnClickSave: action.payload,
                        notes: {
                            ...state.notes,
                            new: {
                                ...state.notes.new,
                                content: <Input id='new-content' placeholder='The note cannot be empty' />,
                            }
                        }
                    }
                }

                newNote = {
                    id: Date.now(),
                    cathegory: state.inputs['select-new-cathegory'].value,
                    name: state.inputs['input-new-name'] ? state.inputs['input-new-name'].value : '',
                    content: state.inputs['input-new-content'].value,
                    created: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    dates: dates.length>1 ? dates.reduce((prev, cur) => prev + ", " + cur) : dates,
                }
            }

            updatedNotes = {
                ...state.notes,
                [newNote.id]: newNote,
            }
            delete updatedNotes.new;

            return {
                ...state,
                btnClickSave: action.payload,
                notes: updatedNotes,
                summary: {
                    ...state.summary,
                    [newNote.cathegory]: {
                        id: newNote.cathegory,
                        cathegory: newNote.cathegory,
                        active: state.summary[newNote.cathegory].active+1,
                        archived: state.summary[newNote.cathegory].archived,
                    }
                },
                inputs: defaultInputs,
            }

        case BTN_CLICK_CANCEL : {
            let updatedNotes = {...state.notes};
            
            if(action.payload.includes('new')) {
                delete updatedNotes.new;
            }
            
            return {
                ...state,
                btnClickCancel: action.payload,
                notes: updatedNotes,
                inputs: defaultInputs,
            }
        }

        case BTN_CLICK_CHECK : {
            const keys = action.payload.split('-');
            let newNotes = {...state.notes};
            let newArchivedNotes = {};
            let summary = {...state.summary};

            if(keys.length === 3) {                
                newArchivedNotes = {...state.archivedNotes, [newNotes[keys[2]].id]: {...newNotes[keys[2]]}};
                summary[newNotes[keys[2]].cathegory].active--;
                summary[newNotes[keys[2]].cathegory].archived++;
                delete newNotes[keys[2]];
            } else {
                Object.values(newNotes).forEach((el) => {
                    summary[el.cathegory].active--;
                    summary[el.cathegory].archived++;
                });
                newArchivedNotes = {...state.archivedNotes, ...state.notes};
                newNotes = {};
            }

            return {
                ...state, 
                btnClickCheck: action.payload, 
                notes: newNotes, 
                archivedNotes: newArchivedNotes,
            }
        }
        
        case BTN_CLICK_DELETE : {
            const keys = action.payload.split('-');
            let newNotes =  {};
            
            if(keys.length === 3) {
                newNotes =  {...state.notes};
                delete newNotes[keys[2]];
            }
            else newNotes = {};

            return {
                ...state, 
                btnClickDelete: action.payload, 
                notes: newNotes
            }
        }

        case INPUT_CHANGE:

            return {
                ...state, 
                inputs: {
                    ...state.inputs,
                    [action.payload.id]: {
                        id: action.payload.id.split('-')[2],
                        value: action.payload.value,
                            // state.inputs[action.payload.id]?.value 
                            // ? state.inputs[action.payload.id].value + action.payload.value 
                            // : action.payload.value,
                    }
                }
            };
        
        default:
            return state;
    }
}