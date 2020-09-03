import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import './NoteListMain.css';

class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <h2>Notes</h2>
                <p>Select note name for details.</p>
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