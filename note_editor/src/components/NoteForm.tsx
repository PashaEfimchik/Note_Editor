import {FormEvent, useState, ChangeEvent, useEffect, useRef} from "react";
import {INote} from "./Note.type";
import {TagSelector} from "./TagSelector";

type NoteFormProps = {
    notes: INote[];
    onSubmitClick: (data: INote) => void
    setEditNote: (bool: boolean) => void;
}

export function NoteForm(props: NoteFormProps) {
    const [newTitle, setNewTitle] = useState<string>("");
    const [newTag, setNewTag] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");
    const refT = useRef<any>();
    const refB = useRef<any>();

    const { onSubmitClick, setEditNote, notes } = props;

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewContent(event.target.value);
    }

    /*const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewTag(event.target.value);
    }*/


    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const data: INote = {
            id: Math.floor(Math.random() * 1000000),
            title: newTitle,
            content: newContent,
            tag: newTag,
        };
        onSubmitClick(data);
        setNewTag(newTag);
        refT.current.value = '';
        refB.current.value = '';
        setEditNote(false);
    }

    useEffect(() => {
        setNewTag(newTag);
    })


    return (
    <div>
      <h1>Note Form</h1>
        <div>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" ref={refT} onChange={handleTitleChange} required/>
            </form>
            {/*<form>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" onChange={handleTagChange}/>
            </form>*/}
        </div>
        <TagSelector
            notes={notes}
            tagNoteList={[]}
            onAddTag={(tag) => setNewTag(tag)}
            setEditNote={setEditNote}
        />
        <form>
            <label htmlFor="body">Body</label>
            <input type="text" id="body" name="body" ref={refB} onChange={handleContentChange}/>
        </form>

        <button onClick={handleSubmit}>Add Note</button>
    </div>
  );
}