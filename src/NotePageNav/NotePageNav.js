import React from 'react';
import AddButton from '../AddButton/AddButton';
import './NotePageNav.css';

export default function NotePageNav(props) {
    return (
        <div className='NotePageNav'>
            
        <AddButton
                tag='button'
                role='link'
                onClick={() => props.history.goBack()}
                className='NotePageNav-Back-Button'
            >
                Go Back
        </AddButton>
        <p>Folder:</p>
            {props.folder && (
                <h3 className='NotePageNav-Folder-Name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageNav.defaultProps = {
    history: {
        goBack: () => {}
    }
}