import { BTN_CLICK_ADD } from "./constants";
import { BTN_CLICK_CANCEL } from "./constants";
import { BTN_CLICK_CHECK } from "./constants";
import { BTN_CLICK_DELETE } from "./constants";
import { BTN_CLICK_EDIT } from "./constants";
import { BTN_CLICK_SAVE } from "./constants";

export const initialState = {
    btnClickAdd: '',
    btnClickCheck: '',
    btnClickCheckAll: '',
    btnClickDelete: '',
    btnClickEdit: '',
    btnClickSave: '',
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
    }
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case BTN_CLICK_ADD :
            return {...state, btnClickAdd: action.payload};

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

            return {...state, btnClickCheck: action.payload, notes: newNotes, archivedNotes: newArchivedNotes};
        }
        
        case BTN_CLICK_DELETE : {
            const keys = action.payload.split('-');
            let newNotes =  {};
            
            if(keys.length === 3) {
                newNotes =  {...state.notes};
                delete newNotes[keys[2]];
            }
            else newNotes = {};

            return {...state, btnClickDelete: action.payload, notes: newNotes};
        }
        
        default:
            return state;
    }
}