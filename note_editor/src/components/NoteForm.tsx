import {FormEvent, useState, ChangeEvent} from "react";
import {INote} from "./Note.type";

type NoteFormProps = {
    onSubmitClick: (data: INote) => void
}

export function NoteForm(props: NoteFormProps) {
    const [newTitle, setNewTitle] = useState<string>("");
    const [newTag, setNewTag] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");

    const { onSubmitClick } = props;

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        const data: INote = {
            id: Math.floor(Math.random() * 1000000),
            title: newTitle,
            content: newContent,
            tag: newTag,
        };
        onSubmitClick(data);
    }

  return (
    <div>
      <h1>Note Form</h1>
        <div>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={handleTitleChange} required/>
            </form>
            <form>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" onChange={handleTagChange}/>
            </form>
        </div>
        <form>
            <label htmlFor="body">Body</label>
            <input type="text" id="body" name="body" onChange={handleContentChange}/>
        </form>

        <div>
            <button type="submit" onClick={handleSubmit}>Add Note</button>
        </div>
    </div>
  );
}