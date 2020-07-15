import React, { Component } from 'react';
import STORE from '../store';
import NoteItem from '../NoteItem/NoteItem';

const notesArr = STORE.notes;

class NotesList extends Component {
    render() {
        return (
            <ul className='NotesList'>
                {notesArr.map(note =>
                    <li key={note.id}>
                        <NoteItem 
                            key={note.id}
                            {...note}
                        />  
                    </li>
                )}
            </ul>
        )
    }
}

export default NotesList;