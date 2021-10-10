import './btn-style.css';
import cancel from './icons/cancel.svg';

const CancelBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-cance${id ? 'l-'+id : 'l'}`}
                className='btn-img' 
                src={cancel} 
                alt='cancel' 
                title='Cancel'
            />
        </div>
    )
}

export default CancelBtn;