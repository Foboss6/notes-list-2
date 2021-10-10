import './btn-style.css';
import trash from './icons/trash.svg';

const DeleteBtn = ({theme, onClick, id}) => {
    return (
        <div 
            className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
            onClick={onClick}   
        >
            <img 
                id={`btn-delet${id ? 'e-'+id : 'e'}`}
                className='btn-img' 
                src={trash} 
                alt='delete' 
                title='Delete'
            />
        </div>
    )
}

export default DeleteBtn;