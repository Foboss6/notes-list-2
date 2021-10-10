import './btn-style.css';
import add from './icons/+.svg';

const AddBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-ad${id ? 'd-'+id : 'd'}`}
                className='btn-img' 
                src={add} 
                alt='add' 
                title='Add'
            />
        </div>
    )
}

export default AddBtn;