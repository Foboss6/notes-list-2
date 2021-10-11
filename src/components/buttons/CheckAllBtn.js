import './btn-style.css';
import doublecheck from './icons/doublecheck.svg';
import { useDispatch } from 'react-redux';
import { btnClickCheck } from '../../actions';

const CheckAllBtn = ({theme, onClick, id}) => {
    const dispatch = useDispatch();
    const btnID = `btn-chekal${id ? 'l-'+id : 'l'}`;
    
    const handlerBtnClick = () => {
        dispatch(btnClickCheck(btnID));
    }

    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick ? onClick : handlerBtnClick}   
        >
            <img 
                id={btnID}
                className='btn-img' 
                src={doublecheck} 
                alt='check all' 
                title='Check All'
            />
        </div>
    )
}

export default CheckAllBtn;