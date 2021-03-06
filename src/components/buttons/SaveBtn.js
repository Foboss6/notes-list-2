import './btn-style.css';
import save from './icons/save.svg';
import { useDispatch } from 'react-redux';
import { btnClickSave } from '../../actions';

const SaveBtn = ({theme, onClick, id, key}) => {
    const dispatch = useDispatch();
    const btnID = `btn-sav${id ? 'e-'+id : 'e'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickSave(btnID));
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