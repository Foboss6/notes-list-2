import AddBtn from "../buttons/AddBtn";
import CancelBtn from "../buttons/CancelBtn";
import CheckAllBtn from "../buttons/CheckAllBtn";
import CheckBtn from "../buttons/CheckBtn";
import DeleteBtn from "../buttons/DeleteBtn";
import EditBtn from "../buttons/EditBtn";
import SaveBtn from "../buttons/SaveBtn";

const TRow = ({data, cellType}) => {

    const id = data.id ? data.id : Math.round(Math.random()*100);

    return (
        <tr id={`tr-${id}`} key={`tr-${id}`}>
            {
                Object.values(data).map((el, i) => (                    
                    cellType === 'head' || cellType === 'th'
                    ?
                        el.toLowerCase().includes('btn')
                        ?
                            <th key={`th-${i}`} className="flex-box">
                            {
                                el.toLowerCase().split(' ').map((b) => {
                                    switch(b) {
                                        case 'addbtn': return <AddBtn id={data.id}/>;
                                        case 'cancelbtn': return <CancelBtn id={data.id}/>;
                                        case 'checkallbtn': return <CheckAllBtn id={data.id}/>;
                                        case 'checkbtn': return <CheckBtn id={data.id}/>;
                                        case 'deletebtn': return <DeleteBtn id={data.id}/>;
                                        case 'editbtn': return <EditBtn id={data.id}/>;
                                        case 'savebtn': return <SaveBtn id={data.id}/>;
                                    }
                                })
                            }
                            </th>
                        :
                        <th key={`th-${i}`}>{el}</th>
                    :
                        i
                        ?
                            el.toLowerCase().includes('btn')
                            ?
                                <td key={`td-${i}`} className="flex-box">
                                {
                                    el.toLowerCase().split(' ').map((b) => {
                                        switch(b) {
                                            case 'addbtn': return <AddBtn theme='dark' id={data.id}/>;
                                            case 'cancelbtn': return <CancelBtn  theme='dark' id={data.id}/>;
                                            case 'checkallbtn': return <CheckAllBtn  theme='dark' id={data.id}/>;
                                            case 'checkbtn': return <CheckBtn  theme='dark' id={data.id}/>;
                                            case 'deletebtn': return <DeleteBtn  theme='dark' id={data.id}/>;
                                            case 'editbtn': return <EditBtn  theme='dark' id={data.id}/>;
                                            case 'savebtn': return <SaveBtn  theme='dark' id={data.id}/>;
                                        }
                                    })
                                }
                                </td>
                            :
                            <td key={`td-${i}`}>{el}</td>
                        :
                            <></>
                ))
            }
        </tr>
    );
}

export default TRow;