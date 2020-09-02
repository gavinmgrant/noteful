import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import config from '../config';
import './NoteListMain.css';

class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    // Add componentDidMount with fetch call to refresh notes/get all notes
    // Long term call endpoint to get notes by id /api/folders/folderId
    
    /* componentDidMount() {
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
    } */

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                note_name={note.note_name}
                                modified={note.modified}
                            />  
                        </li>
                    )}
                </ul>
                <button className='NoteListMain-Button-Container'>
                    <AddButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain-Add-Note-Button'
                    >
                        Add Note
                    </AddButton>
                </button>
            </section>
        );
    }
}

export default NoteListMain;