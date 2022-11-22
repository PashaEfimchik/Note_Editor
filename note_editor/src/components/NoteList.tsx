import {useState} from "react";
import {INote} from "./Note.type";

type NoteListProps = {
    notes: INote[]
    onDeleteClick: (data: INote) => void
    onEditClick: (data: INote) => void
}

export function NoteList (props: NoteListProps) {
    const { notes, onDeleteClick, onEditClick } = props;
    return (
        <div>
            <table>
                <thead>
                    <h1>Note List</h1>
                </thead>
                <tbody>
                {notes.map(note => (
                    <tr key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.content}</td>
                        <td>{note.tag}</td>
                        <td>
                            <button onClick={() => onDeleteClick(note)}>Delete</button>
                            <button onClick={() => onEditClick(note)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}