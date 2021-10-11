import './btn-style.css';
import save from './icons/save.svg';
import { useDispatch } from 'react-redux';
import { btnClickDelete } from '../../actions';

const SaveBtn = ({theme, onClick, id}) => {
    const dispatch = useDispatch();
    const btnID = `btn-sav${id ? 'e-'+id : 'e'}`;
    
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
                src={save} 
                alt='save' 
                title='Save'
            />
        </div>
    )
}

export default SaveBtn;