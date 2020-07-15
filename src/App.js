import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoldersList from './FoldersList/FoldersList';
import NotesList from './NotesList/NotesList';
import './App.css';

class App extends Component {  
  render() {
    return (
      <div className='App'>
        <header>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <div className='Contents'>
          <aside>
            <FoldersList />
          </aside>
          <main>
            <NotesList /> 
          </main>
        </div>
      </div>
    );
  }    
}

export default App;