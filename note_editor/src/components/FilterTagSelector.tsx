import CreatableReactSelect from "react-select/creatable";
import {INote} from "./Note.type";
import {useEffect, useState} from "react";
import {NoteList} from "./NoteList";

type FilterTagSelectorProps = {
    notes: INote[];
    tags: string[];
    tagNoteList: string[];
    onDeleteClick: (data: INote) => void
    onEditClick: (data: INote) => void
}

export function FilterTagSelector(props: FilterTagSelectorProps) {
    const { tagNoteList, tags, notes } = props;
    const [selectedTags, setSelectedTags] = useState();

    const handleSelect = (e: any) => {
        setSelectedTags(e.map((tag: any) => tag.value));
    }

    const getFilteredNotes = () => {
        if (selectedTags) {
            // @ts-ignore
            return notes.filter(note => selectedTags.every(tag => note.tag.split(" ").includes(tag)));
        }
        return notes;
    }

    useEffect(() => {
        tagNoteList.map(tag => ({value: tag, label: tag}));
        getFilteredNotes();
    }, [notes]);

    return (
        <div style={{width: "20%"}}>
            <h1>Filter Tag Selector</h1>
            <CreatableReactSelect
                isMulti
                isClearable
                options={
                    tags.map(tag => ({value: tag, label: tag}))
                }
                placeholder={"Filter by #tags"}
                defaultValue={tagNoteList.map(
                    tag => ({value: tag, label: tag}))
                }
                onChange={handleSelect}
            />
            <NoteList
                notes={getFilteredNotes()}
                onDeleteClick={props.onDeleteClick}
                onEditClick={props.onEditClick} />
        </div>
    );
}