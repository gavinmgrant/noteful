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
            name: '',
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
                name: responseData.name,
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { folderId } = this.props.match.params;
        const { name } = this.state
        const newFolder = { name }
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
            name: newFields.name || '',
        })
    };

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Folder name is required.';
        } else if (name.length < 3) {
            return 'Folder name must be at least 3 characters long.';
        }
    }

    render() {
        return (
            <form className="Add-Folder" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <p>Enter a name for your folder.</p>
                <div className="Add-Folder-Form-Divs">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="Add-Folder-Input" 
                        name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
                    <ValidationError message={this.validateName()}/>
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

export default EditFolder;