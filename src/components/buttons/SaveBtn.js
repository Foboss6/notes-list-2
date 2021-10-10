import './btn-style.css';
import save from './icons/save.svg';

const SaveBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-sav${id ? 'e-'+id : 'e'}`}
                className='btn-img' 
                src={save} 
                alt='save' 
                title='Save'
            />
        </div>
    )
}

export default SaveBtn;