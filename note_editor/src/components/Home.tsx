import { useEffect, useState } from "react";
import { INote } from "./Note.type";
import { NoteForm } from "./NoteForm";
import {EditNote} from "./EditNote";
import {useLocalStorage} from "./useLocalStorage";
import {FilterTagSelector} from "./FilterTagSelector";


export default function Home() {
    const [notes, setNotes] = useLocalStorage<INote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<string[]>("TAGS", []);
    const [editNote, setEditNote] = useState<INote>(notes.map(note => note)[0]);
    const [showEditNote, setShowEditNote] = useState(false);

    useEffect(() => {
        setTags(() => Array.from(new Set(notes.map(note => note.tag.split(" ")).flat())));
    }, [notes]);

    const onAddNote = (newData: INote) => {
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

  return (
      <div>
          {showEditNote ? (
              <EditNote
                  data={editNote}
                  onUpdatedNote={onUpdateNote}
                  setEditNote={setShowEditNote}
                  notes={notes}
              />
          ) : (
              <NoteForm
                  onSubmitClick={onAddNote}
                  notes={notes}
                  setEditNote={setShowEditNote}
              />
          )}
          <FilterTagSelector
              notes={notes}
              tags={tags}
              tagNoteList={[]}
              onDeleteClick={onDeleteNote}
              onEditClick={onCurrentNote}
          />
      </div>
    );
}