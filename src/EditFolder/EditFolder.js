import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import './EditFolder.css'

class EditFolder extends Component {
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
            folder_name: '',
    }

    componentDidMount() {
        const { folderId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/folders/${folderId}`, {
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
                folder_name: responseData.folder_name,
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleNameChange = e => {
        this.setState({ folder_name: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { folderId } = this.props.match.params;
        const { id, folder_name } = this.state
        const newFolder = { id, folder_name }
        fetch(config.API_ENDPOINT + `/folders/${folderId}`, {
            method: 'PATCH',
            body:JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.resetFields(newFolder)
            this.context.updateFolder(newFolder)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            folder_name: newFields.folder_name || '',
        })
    };

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    validateName() {
        const name = this.state.folder_name.trim();
        if (name.length === 0) {
            return 'Folder name is required.';
        } else if (name.length < 3) {
            return 'Folder name must be at least 3 characters long.';
        }
    }

    render() {
        const { folder_name } = this.state

        return (
            <form className="Edit-Folder" onSubmit={e => this.handleSubmit(e)}>
                <h2>Edit Folder</h2>
                <p>Edit the name for your folder.</p>
                <div className="Edit-Folder-Form-Divs">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="Edit-Folder-Input" 
                        name="folder_name" 
                        id="folder_name" 
                        placeholder={folder_name}
                        value={folder_name} 
                        onChange={this.handleNameChange}/>
                    <ValidationError message={this.validateName()}/>
                </div>
                <div> 
                    <button
                        type="submit"
                        disabled={this.validateName()}
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

export default EditFolder;