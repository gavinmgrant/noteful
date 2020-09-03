import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import './AddFolder.css'

class AddFolder extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            folder_name: {
                value: ''
            }
        }
    }

    updateName(name) {
        this.setState({folder_name: {value: name}});
    }

    handleSubmit = e => {
        e.preventDefault();
        const { folder_name } = e.target
        const folderName = {
            folder_name: folder_name.value,
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body:JSON.stringify(folderName),
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
            this.context.addFolder({...data, folder_name: folder_name.value})
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    validateName() {
        const name = this.state.folder_name.value.trim();
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
                        folder_name="folder_name" id="folder_name" onChange={e => this.updateName(e.target.value)}/>
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

export default AddFolder;