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
            }
        }
    }

    updateName(name) {
        this.setState({name: {value: name}});
        console.log("Name: ", name)
    }

    updateContent(content) {
        this.setState({content: {value: content}});
        console.log("Content: ", content)
    }

    updateFolder(folder) {
        this.setState({folder: {value: folder}});
    }

    handleSubmit = e => {
        e.preventDefault();
        const { name, content, folder } = this.state;
        const newNote = {
            name: name.value,
            content: content.value,
            folder: folder.value
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body:JSON.stringify(newNote)
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
            name.value = ''
            content.value = ''
            folder.value = ''
            this.context.addNote(data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Note name is required';
        } else if (name.length < 3) {
            return 'Note name must be at least 3 characters long';
        }
    }

    render() {
        const { folders=[] } = this.context
        let folderOptions = folders.map((folder) =>
            <option key={folder.name}>{folder.name}</option>
        );

        return (
            <form className="Add-Note" onSubmit={e => this.handleSubmit(e.target.value)}>
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
                        name='content' 
                        placeholder='Write note content here.'
                        onChange={e => this.updateContent(e.target.value)}
                    />
                </div>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor='folder'>
                        Folder
                    </label>
                    <select
                        className="Add-Folder-Input"
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