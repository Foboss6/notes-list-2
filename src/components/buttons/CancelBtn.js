import './btn-style.css';
import cancel from './icons/cancel.svg';
import { useDispatch } from 'react-redux';
import { btnClickCancel } from '../../actions';

const CancelBtn = ({theme, onClick, id, key}) => {
    const dispatch = useDispatch();
    const btnID = `btn-cance${id ? 'l-'+id : 'l'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickCancel(btnID));
    }

    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick ? onClick : handlerBtnClick}   
        >
            <img 
                id={btnID}
                className='btn-img' 
                src={cancel} 
                alt='cancel' 
                title='Cancel'
            />
        </div>
    )
}

export default CancelBtn;