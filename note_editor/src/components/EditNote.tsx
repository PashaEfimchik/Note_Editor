import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import { INote } from "./Note.type";
import {useLocalStorage} from "./useLocalStorage";
import {TagSelector} from "./TagSelector";
import '../styles/NoteForm.scss'

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
    const [tagTitle, setTagTitle] = useState<string>("");
    const [tagContent, setTagContent] = useState<string>("");
    const [note, setNote] = useLocalStorage<INote>("CHANGED", data);

    const setNoteStore = (note: INote) => {
        setNote(note);
    }

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newTitle = event.target.value;
        let arrTitle = newTitle.split(" ");
        let addNewTagTitle = [];
        for (let i = 0; i < arrTitle.length; i++) {
            if (arrTitle[i].startsWith("#")) {
                addNewTagTitle.push(arrTitle[i].slice(1));
                delete arrTitle[i];
            }
        }
        setTagTitle(addNewTagTitle.join(" "));
        setTitle(arrTitle.join(" "));
    }

    const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newContent = event.target.value;
        let arrContent = newContent.split(" ");
        let addNewTagContent = [];
        for (let i = 0; i < arrContent.length; i++) {
            if (arrContent[i].startsWith("#")) {
                addNewTagContent.push(arrContent[i].slice(1));
                delete arrContent[i];
            }
        }
        setTagContent(addNewTagContent.join(" "));
        setContent(arrContent.join(" "));
    }

    useEffect(() => {
        setNoteStore(data);
    })

    const handleUpdateClick = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let tagSum = tag + " " + tagTitle + " " + tagContent;
        let arr = tagSum.split(" ");
        const uniqTags = Array.from(new Set(arr)).join(" ");
        const updatedNote: INote = {
            id: note.id,
            title: title,
            content: content,
            tag: uniqTags,
        }
        onUpdatedNote(note.id, updatedNote);
        setTag(uniqTags);
    }

    return (
        <div className="NoteForm">
            <h1>Edit Note</h1>
            <div className="formNote">
                <form className="formTitle">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={onTitleChange}/>
                </form>
                <TagSelector
                    notes={notes}
                    tagNoteList={tag.split(" ")}
                    onAddTag={(tag) => setTag(tag)}
                    setEditNote={setEditNote}
                />
            </div>
            <div className="formContent">
                <form className="formContent">
                    <label htmlFor="body">Body</label>
                    <textarea id="body" name="body" value={content} onChange={onContentChange} required/>
                </form>
            </div>
            <div className="formButton">
                <button className="editNoteForm" onClick={handleUpdateClick}>Update</button>
                <button className="cancelEditNoteForm" onClick={() => setEditNote(false)}>Cancel</button>
            </div>
        </div>
    )
}