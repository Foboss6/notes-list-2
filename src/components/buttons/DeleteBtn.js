import './btn-style.css';
import trash from './icons/trash.svg';
import { useDispatch } from 'react-redux';
import { btnClickDelete } from '../../actions';

const DeleteBtn = ({theme, onClick, id}) => {
    const dispatch = useDispatch();
    const btnID = `btn-delet${id ? 'e-'+id : 'e'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickDelete(btnID));
    }
    
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick ? onClick : handlerBtnClick}   
        >
            <img 
                id={btnID}
                className='btn-img' 
                src={trash} 
                alt='delete' 
                title='Delete'
            />
        </div>
    )
}

export default DeleteBtn;