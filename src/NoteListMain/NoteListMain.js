import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import './NoteListMain.css'

export default function NoteListMain(props) {
    return (
        <section className='NoteListMain'>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Note 
                            key={note.id}
                            name={note.name}
                            modified={note.modified}
                        />  
                    </li>
                )}
            </ul>
            <div className='NoteListMain-Button-Container'>
                <AddButton
                    tag={Link}
                    to='/add-note'
                    type='button'
                    className='NoteListMain-Add-Note-Button'
                >
                    Add Note
                </AddButton>
            </div>
        </section>
    )
}

NoteListMain.defaultProps = {
    notes: [],
}