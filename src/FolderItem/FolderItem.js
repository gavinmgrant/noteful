import React from 'react';
import './FolderItem.css';

export default function FolderItem(props) {
    return (
        <li className='FolderItem'>
            {props.name}
        </li>
    )
}