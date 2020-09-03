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

    handleClickDelete = (e, id) => {
        e.preventDefault()
    
        fetch(`${config.API_ENDPOINT}/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) 
                throw new Error(`Could not delete item ${id}.`)
            return
        })
        .then(() => {
            this.context.deleteFolder(id)
            // allow parent to perform extra behaviour
            this.props.onDeleteFolder(id)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='NoteListNav'>
                <h2>Folders</h2>
                <p>Select folder name to filter notes by folder.</p>
                <ul className='NoteListNav-List'>
                    {folders.map(folder =>
                        <li key={folder.id} className='NoteListNav-Folder-Link'>
                            <NavLink
                                to={`/folders/${folder.id}`}
                            >
                                <h4>
                                    {folder.folder_name}
                                </h4>        
                            </NavLink>
                            <div className='FolderButton-Area'>
                            {'('}{countNotesForFolder(notes, folder.id)} notes)&nbsp;&nbsp;&nbsp;
                            <Link to={`/edit-folder/${folder.id}`}>
                                Edit
                            </Link>
                            <button 
                                className='FolderButton-Delete'
                                type='button'
                                onClick={(e) => this.handleClickDelete(e, folder.id)}
                            >
                                Delete
                            </button>
                            </div>
                        </li>
                    )}
                </ul>
                <button className='NoteListNav-Button-Container'>
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