import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css';

class Note extends Component {
    static defaultProps ={
        onDeleteNote: () => {},
    }
    static contextType = NotefulContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
    
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) 
                throw new Error(`Could not delete item ${noteId}.`)
            return
            })
        .then(() => {
            this.context.deleteNote(noteId)
            // allow parent to perform extra behaviour
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
    }
    
    render() {
        const { note_name, id, modified } = this.props
        return (
                <div className='NoteItem'>
                    <div className='NoteDetails'>
                        <h3 className='NoteName'>   
                            <Link to={`/notes/${id}`}>
                                {note_name}
                            </Link>
                        </h3>
                        <p className='NoteModified'>Modified on: {modified}</p>
                    </div>
                    <div className='NoteButton-Area'>
                        <Link to={`/edit-note/${id}`}>
                            Edit
                        </Link>
                        <button 
                            className='NoteButton-Delete'
                            type='button'
                            onClick={this.handleClickDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div> 
        )
    }
}

Note.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        note_name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        modified: PropTypes.string,
        onDeleteNote: PropTypes.object
    }))
};

export default Note;