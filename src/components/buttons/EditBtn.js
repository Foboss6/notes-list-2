import './btn-style.css';
import pencil from './icons/pencil.svg';

const EditBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-edi${id ? 't-'+id : 't'}`}
                className='btn-img' 
                src={pencil} 
                alt='edit' 
                title='Edit'
            />
        </div>
    )
}

export default EditBtn;