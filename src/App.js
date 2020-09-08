import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import NotefulError from './NotefulError';
import './App.css';
import EditFolder from './EditFolder/EditFolder';
import EditNote from './EditNote/EditNote';

class App extends Component {  
  state = {
    notes: [],
    folders: [],
  };

  handleDeleteFolder = folderId => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId)
    });
    window.location.reload(false);
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note],
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
          {['/', '/folders/:folderId'].map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={NoteListNav}
              />
          ))}
          <Route path="/notes/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={AddFolder} />
          <Route path="/edit-folder/:folderId/" component={EditFolder} />
      </>
    );
  }
  
  renderMainRoutes() {
    return (
      <>
          {['/', '/folders/:folderId'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteListMain}
            />
          ))}
          <Route path="/notes/:noteId" component={NotePageMain} />
          <Route path="/add-note" component={AddNote} />
          <Route path="/edit-note/:noteId/" component={EditNote} />
      </>
    );
  } 

  updateNote = updatedNote => {
    this.setState({
      notes: this.state.notes.map(note =>
        (note.id !== updatedNote.id) ? note : updatedNote
      )
    })
  }

  updateFolder = updatedFolder => {
    this.setState({
      folders: this.state.folders.map(folder =>
        (folder.id !== updatedFolder.id) ? folder : updatedFolder
      )
    })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteFolder: this.handleDeleteFolder,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      updateNote: this.updateNote,
      updateFolder: this.updateFolder,
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
            <NotefulError>
              <nav className="App-Nav">{this.renderNavRoutes()}</nav>
            </NotefulError>
            <NotefulError>
              <main className="App-Main">{this.renderMainRoutes()}</main>
            </NotefulError>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }    
}

export default App;