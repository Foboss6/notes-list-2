
import './App.css';

import { connect } from 'react-redux';
import Table from '../components/table/Table';

const mapStateToProps = (state) => {
  return state;
}

const App = (state) => {
  // const store = createStore(btnClickDelete, initialState);
  console.log(state.notes);

  const handlerBtnClick = (event) => {
    console.log(event.target.id);
  }

  let notesForTable = {};
  Object.values(state.notes).forEach(el => {
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
          head={{0: 'Cathegory', 1: 'Name', 2: 'Content', 3: 'Created', 4: 'Dates'}}
          body={state.archivedNotes}
        />
      </section>
    </main>
  );
}

export default connect(mapStateToProps)(App);
