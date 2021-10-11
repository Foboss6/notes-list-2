
import './App.css';

// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import Table from '../components/table/Table';

// const mapStateToProps = (state) => {
//   return state;
// }

const App = (state) => {
  // const store = createStore(btnClickDelete, initialState);
  const notes = useSelector(state => state.notes);
  const archivedNotes = useSelector(state => state.archivedNotes);
  const summary = useSelector(state => state.summary);

  let notesForTable = {};
  Object.values(notes).forEach(el => {
    notesForTable = {
      ...notesForTable,
      [el.id]: {
        ...el,
        zbuttons: 'checkbtn editbtn deletebtn',
      }
    }
  });
  
  return (
    <main className="App-main">
      <section>
        <Table 
          id='notes'
          head={{0: 'Cathegory', 1: 'Name', 2: 'Content', 3: 'Created', 4: 'Dates', 5: 'AddBtn CheckAllBtn DeleteBtn'}} 
          body={notesForTable}
        />
        <Table 
          id='summary'
          head={{0: 'Cathegory', 1: 'Active', 2: 'Archived'}} 
          body={summary}
        />
        <Table 
          head={{0: 'Cathegory', 1: 'Name', 2: 'Content', 3: 'Created', 4: 'Dates'}}
          body={archivedNotes}
        />
      </section>
    </main>
  );
}

export default App;
