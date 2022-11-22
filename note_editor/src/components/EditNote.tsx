import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { INote } from "./Note.type";

type NoteFormProps = {
    data: INote;
    onUpdatedNote: (id: number, data: INote) => void;
    setEditNote: (bool: boolean) => void;
}

export function EditNote(props: NoteFormProps) {
    const { data, onUpdatedNote, setEditNote } = props;
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [tag, setTag] = useState(data.tag);
    const [note, setNote] = useState(data);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }

    useEffect(() => {
        setNote(data);
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

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {title, value} = e.target;
        setNote({...note, [title]: value})
    }

    return (
        <div>
            <h1>Edit Note</h1>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </form>
            <form>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" value={tag} onChange={onTagChange}/>
            </form>
            <form>
                <label htmlFor="body">Body</label>
                <input type="text" id="body" name="body" value={content} onChange={onContentChange} required/>
            </form>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={() => setEditNote(false)}>Cancel</button>
        </div>
    )
}