import './btn-style.css';
import pencil from './icons/pencil.svg';
import { useDispatch } from 'react-redux';
import { btnClickEdit } from '../../actions';

const EditBtn = ({theme, onClick, id, key}) => {
    const dispatch = useDispatch();
    const btnID = `btn-edi${id ? 't-'+id : 't'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickEdit(btnID));
    }
    
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick ? onClick : handlerBtnClick}   
        >
            <img 
                id={btnID}
                className='btn-img' 
                src={pencil} 
                alt='edit' 
                title='Edit'
            />
        </div>
    )
}

export default EditBtn;