import { useDispatch } from 'react-redux';
import { btnClick } from '../../actions';

const Button = ({id, children}) => {
    const dispatch = useDispatch();
    const handlerBtnClick = (event) => {
        dispatch(btnClick(id));
    }

    return (
        <button id={id} onClick={handlerBtnClick}>{children}</button>
    )
}

export default Button;