import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import config from './config';
import './App.css';

class App extends Component {  
  state = {
    notes: [],
    folders: [],
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      })
  }

  renderNavRoutes() {
    return (
      <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={NoteListNav}
              />
          ))}
          <Route path="/note/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={AddFolder} />
          <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }
  
  renderMainRoutes() {
    return (
      <>
          {['/', '/folder/:folderId'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteListMain}
            />
          ))}
          <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  } 

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder
    };
    return (
      <NotefulContext.Provider value={value}>
        <div className='App'>
          <header className="App-Header">
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <div className="Contents">
            <nav className="App-Nav">{this.renderNavRoutes()}</nav>
            <main className="App-Main">{this.renderMainRoutes()}</main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }    
}

export default App;