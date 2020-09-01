import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import './EditNote.css';

class EditNote extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };
    
    static contextType = NotefulContext;

    state = {
        error: null,
        id: '',
        note_name: '',
        content: '',
        folder: '',
    }

    componentDidMount() {
        const { noteId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                note_name: responseData.note_name,
                content: responseData.content,
                folder: responseData.folder,
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleChangeName = e => {
        this.setState({ note_name: e.target.value })
    };

    handleChangeContent = e => {
        this.setState({ content: e.target.value })
    };

    handleChangeFolder = e => {
        this.setState({ folder: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        const { noteId } = this.props.match.params;
        const { id, note_name, content, folder } = this.state;
        let modified = new Date().toLocaleString();
        const newNote = { id, note_name, content, folder, modified }

        fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
            method: 'PATCH',
            body:JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.resetFields(newNote)
            this.context.updateNote(newNote)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            note_name: newFields.note_name || '',
            context: newFields.context || '',
            folder: newFields.folder || '',
        })
    };

    handleClickCancel = () => {
        this.props.history.push('/')
    };

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
        const { error, note_name, content, folder } = this.state
        const { folders=[] } = this.context
        let folderOptions = folders.map((folder) =>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
        );

        return (
            <form className="Add-Note" onSubmit={this.handleSubmit}>
                <h2>Edit Note</h2>
                <p>Enter a name, contents, and folder name for this note.</p>
                <div className='EditNote__error' role='alert'>
                        {error && <p>{error.message}</p>}
                </div>
                <div className="Add-Note-Form-Divs">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="Add-Folder-Input" 
                        name="name" 
                        id="name" 
                        placeholder='Write note name here.'
                        value={note_name}
                        onChange={this.handleChangeName}
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
                        value={content}
                        onChange={this.handleChangeContent}
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
                        value={folder}
                        onChange={this.handleChangeFolder}
                    >
                        {folderOptions}
                    </select>
                </div>
                <div>
                    <button
                        type='button'
                        onClick={this.handleClickCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default EditNote;