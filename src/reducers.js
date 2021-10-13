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
                        category: 
                            <Select id='new-category'/>,
                        name: 
                            <Input id='new-name' placeholder='name' />,
                        content: 
                            <Input id='new-content' placeholder='note' />,
                        created: '',
                        dates: '',
                    }
                },
                newNote: {
                    category: 'Task',
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
                            category: 
                                <Select id='edit-category' value={state.notes[key].category}/>,
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
                    category: state.newNote.category,
                    name: state.newNote.name ? state.newNote.name : '',
                    content: state.newNote.content,
                    created: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    dates: dates.length>1 ? dates.reduce((prev, cur) => prev + ", " + cur) : dates,
                };
                
                const summaryID = newNote.category;
                
                updatedSummary = {
                    ...state.summary,
                    [summaryID]: {
                        id: summaryID,
                        category: summaryID,
                        active: state.summary[summaryID].active+1,
                        archived: state.summary[summaryID].archived,
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
                    category: state.editNote.category,
                    name: state.editNote.name ? state.editNote.name : '',
                    content: state.editNote.content,
                    created: state.editNote.created,
                    dates: dates.length>1 ? dates.reduce((prev, cur) => prev + ", " + cur) : dates,
                };

                // if category of a note was changed, recount a summary
                const prevNotescategory = state.notes[editetNoteID].category.props.value;
                if(state.editNote.category !== prevNotescategory) {
                    updatedSummary = {
                        ...state.summary,
                        [newNote.category]: {
                            id: newNote.category,
                            category: newNote.category,
                            active: state.summary[newNote.category].active+1,
                            archived: state.summary[newNote.category].archived,
                        },
                        [prevNotescategory]: {
                            id: prevNotescategory,
                            category: prevNotescategory,
                            active: state.summary[prevNotescategory].active-1,
                            archived: state.summary[prevNotescategory].archived,
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
                const arcCategory = newNotes[key].category;   
                newArchivedNotes = {
                    ...state.archivedNotes, 
                    [newNotes[key].id]: { ...newNotes[key] },
                };
                summary[arcCategory].active--;
                summary[arcCategory].archived++;
                delete newNotes[key];
            } else { // archive all notes
                Object.values(newNotes).forEach((el) => {
                    summary[el.category].active--;
                    summary[el.category].archived++;
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
                const delCategory = newNotes[key].category;
                
                newNotes =  {...state.notes};
                updatedSummary = {
                    ...state.summary,
                    [newNotes[key].category]: {
                        id: newNotes[key].category,
                        category: newNotes[key].category,
                        active: state.summary[delCategory].active-1,
                        archived: state.summary[delCategory].archived,
                    }
                }
                delete newNotes[key];
            }
            else {
                updatedSummary = { //delete all notes
                    "Task": {
                        id: "Task",
                        category: "Task",
                        active: 0,
                        archived: state.summary['Task'].archived,
                    },
                    "Idea": {
                        id: "Idea",
                        category: "Idea",
                        active: 0,
                        archived: state.summary['Idea'].archived,
                    },
                    "Random Thought": {
                        id: "Random Thought",
                        category: "Random Thought",
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