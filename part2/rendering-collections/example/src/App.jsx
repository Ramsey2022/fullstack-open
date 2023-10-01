import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const Note = ({ note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'

    return (
      <li className='note'>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>note app, department of computer science, university of Helsinki 2023 </em>
      </div>
    )
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange} 
        />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
