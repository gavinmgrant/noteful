import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import './AddNote.css'

class AddNote extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            note_name: {
                value: ''
            },
            content: {
                value: ''
            },
            folder: {
                value: ''
            },
            folderId: {
                value: ''
            },
            modified: {
                value: ''
            },
        }
    }

    updateName(note_name) {
        this.setState({note_name: {value: note_name}});
    }

    updateContent(content) {
        this.setState({content: {value: content}});
    }

    updateFolder(folder, folderId) {
        this.setState({folder: {value: folder}});
        this.setState({folderId: {value: folderId}});
    }

    handleSubmit = e => {
        e.preventDefault();
        const { note_name, content, folder } = e.target
        let modified = new Date().toLocaleString();
        const newNote = {
            note_name: note_name.value,
            content: content.value,
            folder: folder.value,
            modified: modified,
        }

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body:JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.context.addNote({
                ...data,
                note_name: note_name.value, 
                content: content.value, 
                folderId: folder.value,
                modified: modified,
            })
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    validateName() {
        const name = this.state.note_name.value.trim();
        if (name.length === 0) {
            return 'Note name is required.';
        } else if (name.length < 3) {
            return 'Note name must be at least 3 characters long.';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Note content is required.'
        } else if (content.length < 6) {
            return 'Note content must be at least 6 characters long.'
        }
    }

    render() {
        const { folders=[] } = this.context
        let folderOptions = folders.map((folder) =>
            <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
        );

        return (
            <form className="Add-Note" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <p>Enter a name, contents, and folder name for your note.</p>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="Add-Folder-Input" 
                        name="note_name" 
                        id="note_name" 
                        placeholder='Write note name here.'
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <ValidationError message={this.validateName()}/>
                </div>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor='content'>
                        Content
                    </label>
                    <input 
                        type='text' 
                        className="Add-Folder-Input"
                        name="content" 
                        id="content" 
                        placeholder='Write note content here.'
                        onChange={e => this.updateContent(e.target.value)}
                    />
                    <ValidationError message={this.validateContent()}/>
                </div>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor='folder'>
                        Folder
                    </label>
                    <select
                        className="Add-Folder-Input"
                        name="folder"
                        id="folder"
                        onChange={e => this.updateFolder(e.target.value)}
                    >
                        {folderOptions}
                    </select>
                </div>
                <div>
                    <button 
                        type="submit"
                        disabled={this.validateName() || this.validateContent()}
                    >
                        Save
                    </button>
                    <button
                        tag='button'
                        role='link'
                        onClick={() => this.props.history.push('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
}

export default AddNote;