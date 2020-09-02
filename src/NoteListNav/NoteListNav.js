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
                <ul className='NoteListNav-List'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav-Folder-Link'
                                to={`/folders/${folder.id}`}
                            >
                                <h3>{folder.folder_name}</h3>
                                {'('}{countNotesForFolder(notes, folder.id)}{')'} notes
                                <div className='FolderButton-Area'>
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