import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import store from './store';
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import './App.css';

class App extends Component {  
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // placeholder loading from future API call
    setTimeout(() => this.setState(store), 600);
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
          <Route
              path="/note/:noteId"
              render={routeProps => {
                  const {noteId} = routeProps.match.params;
                  const note = findNote(notes, noteId) || {};
                  const folder = findFolder(folders, note.folderId);
                  return <NotePageNav {...routeProps} folder={folder} />;
              }}
          />
          <Route path="/add-folder" component={NotePageNav} />
          <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }
  
  renderMainRoutes() {
    const {notes} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              );
            }}
          />
        ))}
          <Route
            path="/note/:noteId"
            render={routeProps => {
              const {noteId} = routeProps.match.params;
              const note = findNote(notes, noteId);
              return (
                <NotePageMain 
                  {...routeProps} 
                  note={note} 
                />
              );
            }}
          />
      </>
    );
  } 

  render() {
    return (
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
    );
  }    
}

export default App;