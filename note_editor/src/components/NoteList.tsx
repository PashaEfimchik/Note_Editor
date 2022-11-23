import {INote} from "./Note.type";
import '../styles/NoteList.scss'

type NoteListProps = {
    notes: INote[]
    onDeleteClick: (data: INote) => void
    onEditClick: (data: INote) => void
}

export function NoteList (props: NoteListProps) {
    const { notes, onDeleteClick, onEditClick } = props;
    return (
        <div className="NoteListForm">
            <table className="tableNoteList">
                {notes.length > 0 && <caption>Note List</caption>}
                {notes.length === 0 && <caption>No Notes yet</caption>}
                {notes.map(note => (
                    <tr className="noteId" key={note.id}>
                        <tr className="noteTitle">{note.title}</tr>
                        <tr className="noteContent">{note.content}</tr>
                        <tr className="noteTag">
                            <div className="divNoteTag" >
                                {note.tag}
                            </div>
                        </tr>
                        <td className="noteListButton">
                            <button className="deleteButton" onClick={() => onDeleteClick(note)}>Delete</button>
                            <button className="editButton" onClick={() => onEditClick(note)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}