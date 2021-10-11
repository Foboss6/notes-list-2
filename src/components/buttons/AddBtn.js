import './btn-style.css';
import add from './icons/+.svg';
import { useDispatch } from 'react-redux';
import { btnClickAdd } from '../../actions';

const AddBtn = ({theme, onClick, id}) => {
    const dispatch = useDispatch();
    const btnID = `btn-ad${id ? 'd-'+id : 'd'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickAdd(btnID));
    }

    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick ? onClick : handlerBtnClick}   
        >
            <img 
                id={btnID}
                className='btn-img' 
                src={add} 
                alt='add' 
                title='Add'
            />
        </div>
    )
}

export default AddBtn;