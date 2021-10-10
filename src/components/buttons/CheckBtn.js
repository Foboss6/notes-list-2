import './btn-style.css';
import check from './icons/check.svg';

const CheckBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-chec${id ? 'k-'+id : 'k'}`}
                className='btn-img' 
                src={check} 
                alt='check' 
                title='Check'
            />
        </div>
    )
}

export default CheckBtn;