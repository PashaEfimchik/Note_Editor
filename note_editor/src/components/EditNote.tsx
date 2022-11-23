import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import { INote } from "./Note.type";
import {useLocalStorage} from "./useLocalStorage";
import {TagSelector} from "./TagSelector";

type NoteFormProps = {
    notes: INote[];
    data: INote;
    onUpdatedNote: (id: number, data: INote) => void;
    setEditNote: (bool: boolean) => void;
}

export function EditNote(props: NoteFormProps) {
    const { data, onUpdatedNote, setEditNote, notes } = props;
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [tag, setTag] = useState(data.tag);
    const [note, setNote] = useLocalStorage<INote>("CHANGED", data);

    const setNoteStore = (note: INote) => {
        setNote(note);
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    /*const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }*/

    useEffect(() => {
        setNoteStore(data);
    })

    const handleUpdateClick = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedNote: INote = {
            id: note.id,
            title: title,
            content: content,
            tag: tag,
        }
        onUpdatedNote(note.id, updatedNote);
    }

    return (
        <div>
            <h1>Edit Note</h1>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={onTitleChange}/>
            </form>
            {/*<form>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" value={tag} onChange={onTagChange}/>
            </form>*/}
            <TagSelector
                notes={notes}
                tagNoteList={tag.split(" ")}
                onAddTag={(tag) => setTag(tag)}
                setEditNote={setEditNote}
            />
            <form>
                <label htmlFor="body">Body</label>
                <input type="text" id="body" name="body" value={content} onChange={onContentChange} required/>
            </form>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={() => setEditNote(false)}>Cancel</button>
        </div>
    )
}