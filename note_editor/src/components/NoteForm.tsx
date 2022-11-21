import {FormEvent, useRef, useState, ChangeEvent} from "react";
import {NoteData} from "../App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export function NoteForm({ onSubmit}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [newTitle, setNewTitle] = useState<string>("");
    const [newTag, setNewTag] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value);
    }

    const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value);
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            body: contentRef.current!.value,
            tags: ''
        })
    }

  return (
    <form>
      <h1>Note Form</h1>
        <div>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" ref={titleRef} onChange={handleTitleChange} required/>
            </form>
            <form>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" onChange={handleTagChange}/>
            </form>
        </div>
        <form>
            <label htmlFor="body">Body</label>
            <textarea id="body" name="body" ref={contentRef} onChange={handleContentChange} required/>
        </form>

        <div>
            <button type="submit" onClick={handleSubmit}>Add Note</button>
        </div>
    </form>
  );
}