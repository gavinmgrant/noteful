import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import { countNotesForFolder } from '../notes-helpers';
import NotefulContext from '../NotefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import './NoteListNav.css';

class NoteListNav extends Component {
    static defaultProps ={
        onDeleteFolder: () => {},
    }
    static contextType = NotefulContext;
    
    handleClickDelete = e => {
        e.preventDefault()
        const folderId = this.context.id
    
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) 
                throw new Error(`Could not delete item ${folderId}.`)
            return
            })
        .then(() => {
            this.context.deleteFolder(folderId)
            // allow parent to perform extra behaviour
            this.props.onDeleteFolder(folderId)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='NoteListNav'>
                <ul className='NoteListNav-List'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav-Folder-Link'
                                to={`/folders/${folder.id}`}
                            >
                                {folder.folder_name}
                                <span className='NoteListNav-Number'>
                                    {' - '}{countNotesForFolder(notes, folder.id)} notes
                                </span>
                                <div className='FolderButton-Area'>
                                    <button 
                                        className='FolderButton-Delete'
                                        type='button'
                                        onClick={this.handleClickDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <button className='NoteListNav-Button-Wrapper'>
                    <AddButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='NoteListNav-Add-Folder-Button'
                    >
                        Add Folder
                    </AddButton>
                </button>
            </div>   
        )
    }
}

NoteListNav.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        folder_name: PropTypes.string.isRequired,
    }))
};

export default NoteListNav;