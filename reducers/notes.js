export default function NotesReducer(notes, action) {
  switch (action.type) {
    case 'add': {
      return [...notes, {
        id: action.id,
        text: action.text,
      }];
    }
    case 'edit': {
      return notes.map(note => note.id === action.id ? action.text : note);
    }
    case 'delete': {
      return notes.filter(note => note.id !== action.id);
    }
    default: {
     throw new Error(`Undefined action ${action.type}`);
    }
  }
}