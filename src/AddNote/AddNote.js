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
            name: {
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
            }
        }
    }

    updateName(name) {
        this.setState({name: {value: name}});
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
        const { name, content, folder } = e.target
        const { folderId } = this.state
        const newNote = {
            name: name.value,
            content: content.value,
            folder: folder.value,
            folderId: folderId.value,
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
                name: name.value, 
                content: content.value, 
                folder: folder.value,
                folderId: folderId.value,
            })
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
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
        }
    }

    render() {
        const { folders=[] } = this.context
        let folderOptions = folders.map((folder) =>
            <option key={folder.name}>{folder.name}</option>
        );

        return (
            <form className="Add-Note" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="Add-Folder-Input" 
                        name="name" 
                        id="name" 
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
                        tag='button'
                        role='link'
                        onClick={() => this.props.history.push('/')}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={this.validateName()}
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default AddNote;