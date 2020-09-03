import React, { Component } from 'react';
import AddButton from '../AddButton/AddButton';
import NotefulContext from '../NotefulContext';
import { findNote, findFolder } from '../notes-helpers';
import './NotePageNav.css';

class NotePageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    } 
    static contextType = NotefulContext;
    
    render() {
        const { notes, folders } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folder)
    
        return (
            <div className='NotePageNav'>
            <h2>Folder:</h2>
                {folder && (
                    <h3 className='NotePageNav-Folder-Name'>
                        {folder.folder_name}
                    </h3>
                )}
            <AddButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav-Back-Button'
                >
                    Go Back
            </AddButton>
            </div>
        )
    }
}

export default NotePageNav;