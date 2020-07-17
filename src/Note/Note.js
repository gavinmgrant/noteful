import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';
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
                return res.json().then(e => Promise.reject(e))
            return res.json()
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
        const { name, id, modified } = this.props
        return (
            <div className='NoteItem'>
                <div className='NoteDetails'>
                    <h2 className='NoteName'>   
                        <Link to={`/note/${id}`}>
                            {name}
                        </Link>
                    </h2>
                    <p className='NoteModified'>Modified on: {modified}</p>
                </div>
                <div className='NoteButton-Area'>
                    <button 
                        className='NoteButton-Delete'
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        Delete Note
                    </button>
                </div>
            </div>   
        )
    }
}

export default Note;