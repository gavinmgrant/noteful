import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

export default function Note(props) {
    return (
        <div className='NoteItem'>
            <div className='NoteDetails'>
                <h2 className='NoteName'>   
                    <Link to={`/note/${props.id}`}>
                        {props.name}
                    </Link>
                </h2>
                <p className='NoteModified'>Modified on: {props.modified.slice(0, 10)}</p>
            </div>
            <div className='NoteButton-Area'>
                <button className='NoteButton-Delete'>Delete Note</button>
            </div>
        </div>
    )
}