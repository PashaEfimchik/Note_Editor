import {useEffect, useState} from "react";
import {IBaseNote, INote} from "./Note.type";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import {EditNote} from "./EditNote";

const initEditNote = {
    id: 0,
    title: "",
    content: "",
    tag: ""
}

export default function Home() {
    const [notes, setNotes] = useState<INote[]>([]);
    const [editNote, setEditNote] = useState<INote>(initEditNote);
    const [showEditNote, setShowEditNote] = useState(false);

    const onAddNote = (newData: IBaseNote) => {
        const id = Math.floor(Math.random() * 1000);
        setNotes([...notes, {...newData, id}]);
    }

    const onCurrentNote = (note: INote) => {
        setEditNote(note);
        setShowEditNote(true);
    }

    const onUpdateNote = (id: number, newData: INote) => {
        setShowEditNote(false);
        setNotes(notes.map(note => note.id === id ? newData : note));
    }

    const onDeleteNote = (currentNote: INote) => {
        setNotes(notes.filter(note => note.id !== currentNote.id));
    }

    useEffect(() => {
        const noteList = localStorage.getItem("notes");
            if (noteList) {
                setNotes(JSON.parse(noteList));
            }
    }, []);

  const setNoteList = (noteList: INote[]) => {
      setNotes(noteList);
      localStorage.setItem("notes", JSON.stringify(noteList));
  }
  return (
      <div>
          {showEditNote ? (
              <EditNote
                  data={editNote}
                  onUpdatedNote={onUpdateNote}
                  setEditNote={setShowEditNote}
              />
          ) : (
              <NoteForm onSubmitClick={onAddNote}/>
          )}
          <NoteList
              notes={notes}
              onDeleteClick={onDeleteNote}
              onEditClick={onCurrentNote} />
      </div>
    );
}