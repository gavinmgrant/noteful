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
            name: {
                value: ''
            }
        }
    }

    updateName(name) {
        this.setState({name: {value: name}});
    }

    handleSubmit = e => {
        e.preventDefault();
        const { name } = e.target
        const folderName = {
            name: name.value,
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
            this.context.addFolder({...data, name: name.value})
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error});
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Folder name is required';
        } else if (name.length < 3) {
            return 'Folder name must be at least 3 characters long';
        }
    }

    render() {
        return (
            <form className="Add-Folder" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
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

export default AddFolder;