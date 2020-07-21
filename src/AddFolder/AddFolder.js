import React, { Component } from 'react';
import AddButton from '../AddButton/AddButton';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';

class AddFolder extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
        console.log("Name: ", name)
    }

    handleSubmit = event => {
        // event.preventDefault();
        const { name } = event.target;
        const folder = {
            name: name.value,
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body:JSON.stringify(folder)
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
            this.context.addFolder(data)
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
            <form className="Add-Folder" onSubmit={e => this.handleSubmit(e.target.value)}>
                <h2>Add Folder</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="Add-Folder-Input" 
                        name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
                    {this.state.name.touched && (
                    <ValidationError message={this.validateName()}/>
                    )}
                </div>
                <AddButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.push('/')}
                >
                    Cancel
                </AddButton>
                <button 
                    type="submit"
                    disabled={this.validateName()}
                >
                    Save
                </button>
            </form>
        )
    }
}

export default AddFolder;