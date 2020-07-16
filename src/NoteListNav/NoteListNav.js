import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import { countNotesForFolder } from '../notes-helpers';
import './NoteListNav.css';

export default function NoteListNav(props) {
    return (
        <div className='NoteListNav'>
            <ul className='NoteListNav-List'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListNav-Folder-Link'
                            to={`/folder/${folder.id}`}
                        >
                            {folder.name}
                            <span className='NoteListNav-Number'>
                                {' - '}{countNotesForFolder(props.notes, folder.id)} notes
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

NoteListNav.defaultProps = {
    folders: []
}