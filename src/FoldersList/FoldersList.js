import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import STORE from '../store';
import FolderItem from '../FolderItem/FolderItem';

const foldersArr = STORE.folders;

class FoldersList extends Component {
    render() {
        return (
            <ul className='FoldersList'>
                {foldersArr.map(folder =>
                    <li key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                            <FolderItem 
                                key={folder.id}
                                {...folder}
                            />
                        </Link>
                    </li>
                )}
            </ul>
        )
    }
}
  
export default FoldersList;