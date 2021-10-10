import './btn-style.css';
import doublecheck from './icons/doublecheck.svg';

const CheckAllBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-chekal${id ? 'l-'+id : 'l'}`}
                className='btn-img' 
                src={doublecheck} 
                alt='check all' 
                title='Check All'
            />
        </div>
    )
}

export default CheckAllBtn;