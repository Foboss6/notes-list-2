import { initialState } from "./initialState";

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

export const reducer = (state=initialState, action) => {
    switch(action.type) {
// button Show Archive was pressed        
        case BTN_CLICK : {
            return {
                ...state,
                showArhivedNotes: !state.showArhivedNotes,
            }
        }
// create a form to adding new note        
        case BTN_CLICK_ADD :
            //check if we already have a new note form, then go out
            if(state.workingWithNotes) {
                return { ...state }
            } else return {
                ...state, 
                notes: {
                    ...state.notes,
                    new: {
                        id: 'new', 
                        cathegory: 
                            <Select id='new-cathegory'/>,
                        name: 
                            <Input id='new-name' placeholder='name' />,
                        content: 
                            <Input id='new-content' placeholder='note' />,
                        created: '',
                        dates: '',
                    }
                },
                newNote: {
                    cathegory: 'Task',
                },
                workingWithNotes: true,
            }
// create a form for editting the note
        case BTN_CLICK_EDIT : {
            const key = action.payload.split('-')[2];
            
            if(!state.workingWithNotes && state.notes[key]) {
                return {
                    ...state,
                    notes: {
                        ...state.notes,
                        [key]: {
                            id: key+'-edit',
                            cathegory: 
                                <Select id='edit-cathegory' value={state.notes[key].cathegory}/>,
                            name: 
                                <Input id='edit-name' placeholder='name' value={state.notes[key].name} />,
                            content: 
                                <Input id='edit-content' placeholder='note' value={state.notes[key].content}/>,
                            created: '',
                            dates: '',
                        },
                    },
                    editNote: { ...state.notes[key] },
                    workingWithNotes: true,
                }
            } else {
                return { ...state }
            }
        }
// save new or editted note
        case BTN_CLICK_SAVE :
            let newNote = {};
            let updatedNotes = {};
            let updatedSummary = {...state.summary};
        // save new note
            if(action.payload.includes('new')) {
                // check the content field, it must be not empty
                if(!state.newNote.content) {
                    return {
                        ...state,
                        notes: {
                            ...state.notes,
                            new: {
                                ...state.notes.new,
                                content: <Input id='new-content' placeholder='The note cannot be empty' />,
                            }
                        }
                    }
                }

                const date = new Date();
                const dates = state.newNote.content ? [...state.newNote.content.matchAll(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)] : [];

                newNote = {
                    id: Date.now(),
                    cathegory: state.newNote.cathegory,
                    name: state.newNote.name ? state.newNote.name : '',
                    content: state.newNote.content,
                    created: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    dates: dates.length>1 ? dates.reduce((prev, cur) => prev + ", " + cur) : dates,
                };

                updatedSummary = {
                    ...state.summary,
                    [newNote.cathegory]: {
                        id: newNote.cathegory,
                        cathegory: newNote.cathegory,
                        active: state.summary[newNote.cathegory].active+1,
                        archived: state.summary[newNote.cathegory].archived,
                    }
                };
        // save editted note
            } else if(action.payload.includes('edit')) {
                // check the content field, it must be not empty
                const editetNoteID = state.editNote.id;
                if(!state.editNote.content) {
                    return {
                        ...state,
                        notes: {
                            ...state.notes,
                            [editetNoteID]: {
                                ...state.notes[editetNoteID],
                                content: <Input id='edit-content' placeholder='The note cannot be empty' />,
                            }
                        }
                    }
                }

                const dates = [...state.editNote.content.matchAll(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)];
                newNote = {
                    id: editetNoteID,
                    cathegory: state.editNote.cathegory,
                    name: state.editNote.name ? state.editNote.name : '',
                    content: state.editNote.content,
                    created: state.editNote.created,
                    dates: dates.length>1 ? dates.reduce((prev, cur) => prev + ", " + cur) : dates,
                };

                // if cathegory of a note was changed, recount a summary
                const prevNotesCathegory = state.notes[editetNoteID].cathegory.props.value;
                if(state.editNote.cathegory !== prevNotesCathegory) {
                    updatedSummary = {
                        ...state.summary,
                        [newNote.cathegory]: {
                            id: newNote.cathegory,
                            cathegory: newNote.cathegory,
                            active: state.summary[newNote.cathegory].active+1,
                            archived: state.summary[newNote.cathegory].archived,
                        },
                        [prevNotesCathegory]: {
                            id: prevNotesCathegory,
                            cathegory: prevNotesCathegory,
                            active: state.summary[prevNotesCathegory].active-1,
                            archived: state.summary[prevNotesCathegory].archived,
                        }
                    };
                }
            }
            
            updatedNotes = {
                ...state.notes,
                [newNote.id]: newNote,
            };

            if(updatedNotes.new) delete updatedNotes.new;

            return {
                ...state,
                notes: updatedNotes,
                summary: updatedSummary,
                newNote: {},
                editNote: {},
                workingWithNotes: false,
            }
// cancel adding a new or editting an exist note
        case BTN_CLICK_CANCEL : {
            let updatedNotes = {...state.notes};
            
            if(action.payload.includes('new')) {
                delete updatedNotes.new;
            }

            if(action.payload.includes('edit')) {
                updatedNotes = { 
                    ...state.notes,
                    [state.editNote.id]: { ...state.editNote }
                }
            }
            
            return {
                ...state,
                notes: updatedNotes,
                newNote: {},
                editNote: {},
                workingWithNotes: false,
            }
        }
// archive one or all notes
        case BTN_CLICK_CHECK : {
            const key = action.payload.split('-')[2];
            let newNotes = {...state.notes};
            let newArchivedNotes = {};
            let summary = {...state.summary};
            // archive one note with id=key
            if(key) {                
                newArchivedNotes = {
                    ...state.archivedNotes, 
                    [newNotes[key].id]: { ...newNotes[key] },
                };
                summary[newNotes[key].cathegory].active--;
                summary[newNotes[key].cathegory].archived++;
                delete newNotes[key];
            } else { // archive all notes
                Object.values(newNotes).forEach((el) => {
                    summary[el.cathegory].active--;
                    summary[el.cathegory].archived++;
                });
                newArchivedNotes = {...state.archivedNotes, ...state.notes};
                newNotes = {};
            }

            return {
                ...state,
                notes: newNotes, 
                archivedNotes: newArchivedNotes,
            }
        }
// delete one or all notes        
        case BTN_CLICK_DELETE : {
            const key = action.payload.split('-')[2];
            let newNotes =  {};
            let updatedSummary = {...state.summary};
            
            if(key) { // delete one note
                newNotes =  {...state.notes};
                updatedSummary = {
                    ...state.summary,
                    [newNotes[key].cathegory]: {
                        id: newNotes[key].cathegory,
                        cathegory: newNotes[key].cathegory,
                        active: state.summary[newNotes[key].cathegory].active-1,
                        archived: state.summary[newNotes[key].cathegory].archived,
                    }
                }
                delete newNotes[key];
            }
            else {
                updatedSummary = { //delete all notes
                    "Task": {
                        id: "Task",
                        cathegory: "Task",
                        active: 0,
                        archived: state.summary['Task'].archived,
                    },
                    "Idea": {
                        id: "Idea",
                        cathegory: "Idea",
                        active: 0,
                        archived: state.summary['Idea'].archived,
                    },
                    "Random Thought": {
                        id: "Random Thought",
                        cathegory: "Random Thought",
                        active: 0,
                        archived: state.summary['Random Thought'].archived,
                    },
                }
            };

            return {
                ...state,
                notes: newNotes,
                summary: updatedSummary,
            }
        }
// save data from input fields when it changed
        case INPUT_CHANGE:
            const fieldName = action.payload.id.split('-')[2];
            if(action.payload.id.includes('new')) {
                return {
                    ...state, 
                    newNote: {
                        ...state.newNote,
                        [fieldName]: action.payload.value,
                    },
                };
            } else {
                return {
                    ...state, 
                    editNote: {
                        ...state.editNote,
                        [fieldName]: action.payload.value,
                    },
                };
            }
        
        default:
            return state;
    }
}