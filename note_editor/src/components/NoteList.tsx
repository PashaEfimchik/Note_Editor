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
            {notes.length > 0 && <h1>Note List</h1>}
            {notes.length == 0 && <h1>No Notes yet</h1>}
            <table>
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