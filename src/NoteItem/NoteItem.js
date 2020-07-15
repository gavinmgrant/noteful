import React from 'react';
import { Link } from 'react-router-dom'
import './NoteItem.css';

export default function NoteItem(props) {
    return (
        <li className='NoteItem'>
            <div className='NoteDetails'>
                <Link to={`/note/${props.id}`}>
                    <h2 className='NoteName'>{props.name}</h2>
                </Link>
                <p>Date modified on: {props.modified}</p>
            </div>
            <div className='NoteButton-Area'>
                <button className='NoteButton-Delete'>Delete Note</button>
            </div>
        </li>
    )
}