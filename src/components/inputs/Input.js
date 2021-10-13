import { useDispatch } from "react-redux";
import { inputChange } from "../../actions";

const Input = (attributes) => {
    const {id, value, placeholder} = attributes;
    const dispatch = useDispatch();
    const inputID = id ? `input-${id}` : `input-${Math.round(Math.random()*100)}`;
    
    const handleInputChange = (event) => {
        dispatch(inputChange(inputID, event.target.value));
    }
    
    return (
        <input 
            id={inputID}
            defaultValue={value ? value : ''}
            placeholder={placeholder ? placeholder : 'Enter a text'}
            onChange={handleInputChange}
        >
        </input>
    );
}

export default Input;