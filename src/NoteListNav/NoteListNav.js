import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import { countNotesForFolder } from '../notes-helpers';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './NoteListNav.css';

class NoteListNav extends Component {
    static contextType = NotefulContext;
    
    render() {
        const { folders=[], notes=[] } = this.context
        console.log(folders)
        return (
            <div className='NoteListNav'>
                <ul className='NoteListNav-List'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav-Folder-Link'
                                to={`/folder/${folder.id}`}
                            >
                                {folder.name}
                                <span className='NoteListNav-Number'>
                                    {' - '}{countNotesForFolder(notes, folder.id)} notes
                                </span>
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
        name: PropTypes.string.isRequired,
    }))
};

export default NoteListNav;