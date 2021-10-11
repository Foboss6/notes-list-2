import './btn-style.css';
import check from './icons/check.svg';
import { useDispatch } from 'react-redux';
import { btnClickCheck } from '../../actions';

const CheckBtn = ({theme, onClick, id}) => {
    const dispatch = useDispatch();
    const btnID = `btn-chec${id ? 'k-'+id : 'k'}`;
    
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
                src={check} 
                alt='check' 
                title='Check'
            />
        </div>
    )
}

export default CheckBtn;