import { useDispatch } from "react-redux";
import { inputChange } from "../../actions";

const Select = ({id, value}) => {
    const dispatch = useDispatch();
    const elID = id ? `select-${id}` : 'select-'+Math.round(Math.random()*100);
    let selectedItem = value ? value : 'Task';
    
    const handleSelectChange = (event) => {
        selectedItem = event.target.value;
        dispatch(inputChange('select-new-cathegory', event.target.value))
    }
    
    return (
        <select 
            id={elID}
            selected={selectedItem}
            onChange={handleSelectChange}
        >
            <option>Task</option>
            <option>Random Thought</option>
            <option>Idea</option>
        </select>
    );
}

export default Select;