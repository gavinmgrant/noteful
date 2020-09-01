import React, { Component } from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';

class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext
    
    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: 'No content found.' }
        
        return (
            <section className='NotePageMain'>
                <Note
                    id={note.id}
                    note_name={note.note_name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain-Content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}

export default NotePageMain;