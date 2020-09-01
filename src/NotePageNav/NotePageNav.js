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
        const folder = findFolder(folders, note.folderId)
        return (
            <div className='NotePageNav'>
            <AddButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav-Back-Button'
                >
                    Go Back
            </AddButton>
            <p>Folder:</p>
                {folder && (
                    <h3 className='NotePageNav-Folder-Name'>
                        {folder.folder_name}
                    </h3>
                )}
            </div>
        )
    }
}

export default NotePageNav;