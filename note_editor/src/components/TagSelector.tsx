import {useLocalStorage} from "./useLocalStorage";
import CreatableReactSelect from "react-select/creatable";
import {INote} from "./Note.type";
import {useEffect} from "react";

type TagSelectorProps = {
    notes: INote[];
    onAddTag: (tag: string) => void;
    tagNoteList: string[];
    setEditNote: (bool: boolean) => void;
}

export function TagSelector(props: TagSelectorProps) {
    let { notes, onAddTag, tagNoteList, setEditNote } = props;
    const [tags, setTags] = useLocalStorage<string[]>("TAGS", []);

    useEffect(() => {
        setTags(() => Array.from(new Set(notes.map(note => note.tag.split(" ")).flat())));
        tagNoteList.map(tag => ({value: tag, label: tag}));
    }, [notes]);

    return (
        <div style={{width: "20%"}}>
            <h1>Tag Selector</h1>
            <CreatableReactSelect
                isMulti
                isClearable
                onChange={(e) => onAddTag(e.map((tag: any) => tag.value).join(" "))}
                options={
                    tags.map(tag => ({value: tag, label: tag}))
                }
                placeholder={"Add #tags"}
                defaultValue={tagNoteList.map(tag => ({value: tag, label: tag}))}
            />
        </div>
    );
}