import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteFolder: () => {},
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
})

export default NotefulContext