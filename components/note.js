import {useContext, useState} from "react";
import {ThemeContext} from "../context/theme";

export default function Note({ note, onChangeNote, onDeleteNote }) {
  const theme = useContext(ThemeContext);

  const [newNote, setNewNote] = useState({
    id: note.id,
    text: note.text
  });

  const [disabled, setDisabled] = useState(true);

  return (
    <>
      {theme}
      <input type="text" name="note" value={newNote.text} onChange={(e) => setNewNote({text: e.target.value})} disabled={disabled}/>

      { disabled && <button onClick={() => setDisabled(false)}>Edit</button>}
      { !disabled && <button onClick={() => {
        onChangeNote({
          id: note.id,
          text: newNote.text
        })
        setDisabled(true)
      }}>Save</button>}
      <button onClick={() => onDeleteNote({id: newNote.id})}>Delete</button>
    </>
  )
}