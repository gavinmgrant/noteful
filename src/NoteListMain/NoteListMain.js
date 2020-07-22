import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteListMain.css'

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
        console.log(notes)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                name={note.name}
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

NoteListMain.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string
    }))
};

export default NoteListMain