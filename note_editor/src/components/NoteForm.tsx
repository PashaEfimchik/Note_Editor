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
    const [tagTitle, setTagTitle] = useState<string>("");
    const [tagContent, setTagContent] = useState<string>("");
    const refT = useRef<any>();
    const refB = useRef<any>();

    const { onSubmitClick, setEditNote, notes } = props;

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let title = event.target.value;
        let arrTitle = title.split(" ");
        let newTagTitle = [];
        for (let i = 0; i < arrTitle.length; i++) {
            if (arrTitle[i].startsWith("#")) {
                newTagTitle.push(arrTitle[i].slice(1));
                delete arrTitle[i];
            }
        }
        setTagTitle(newTagTitle.join(" "));
        setNewTitle(arrTitle.join(" "));
    }

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        let content = event.target.value;
        let arrContent = content.split(" ");
        let newTagContent = [];
        for (let i = 0; i < arrContent.length; i++) {
            if (arrContent[i].startsWith("#")) {
                newTagContent.push(arrContent[i].slice(1));
                delete arrContent[i];
            }
        }
        setTagContent(newTagContent.join(" "));
        setNewContent(arrContent.join(" "));
    }

    const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let tagSum = newTag + " " + tagTitle + " " + tagContent;
        let arr = tagSum.split(" ");
        const uniqTags = Array.from(new Set(arr)).join(" ");
        const data: INote = {
            id: Math.floor(Math.random() * 1000000),
            title: newTitle,
            content: newContent,
            tag: uniqTags,
        };
        onSubmitClick(data);
        setNewTag(uniqTags);
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