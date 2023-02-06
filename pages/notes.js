import {useReducer, useState} from "react";
import Note from "../components/note";
import NotesReducer from "../reducers/notes";
import List from "../components/list";

let id = 0;

export default function Notes() {
  const [note, setNote] = useState({
    text: ""
  });

  const [notes, dispatch] = useReducer(NotesReducer, []);

  const handleSave = () => {
    dispatch({
      type: 'add',
      id: id++,
      text: note.text,
    })
  }

  const handleChangeNote = (newNote) => {
    dispatch({
      type: 'edit',
      id: newNote.id,
      text: newNote.text
    })

    console.log(notes);
  }

  const handleDeleteNote = (oldNote) => {
    dispatch({
      type: 'delete',
      id: oldNote.id
    })

    console.log(notes);
  }

  return (
    <>
      <input type="text" name="note" value={note.text} onChange={(e) => {setNote({text: e.target.value})}} />

      <button onClick={() => handleSave()}>Save</button>

      { notes.length > 0 && (
        <List theme="light">
          { notes.map((note, index) => (
            <li key={index}>
              <Note note={note} onChangeNote={handleChangeNote} onDeleteNote={handleDeleteNote}/>
            </li>
          ))}
        </List>
      )}
    </>
  )
}