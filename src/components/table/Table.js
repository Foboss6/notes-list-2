import './table-style.css';
import TRow from './TRow';

const Table = ({ id, head, body}) => {

    id = id ? id : Math.round(Math.random()*100);

    return (
        <table className='table' id={`table-${id}`} key={`table-${id}`}>
            {
                head
                ?
                <thead className='thead'>
                    <TRow data={head} cellType='th' />
                </thead>
                :
                <thead className='thead'>
                    <tr><td>An error was occur while loading data</td></tr>
                </thead>

            }
            {
                body
                ?
                <tbody className='tbody'>
                    {
                        Object.values(body).map((el) => <TRow data={el} cellType='data' />)
                    }
                </tbody>
                :
                <tbody className='tbody'>
                    <tr><td>An error was occur while loading data</td></tr>
                </tbody>
            }
        </table>
    )
}

export default Table;