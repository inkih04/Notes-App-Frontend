import SidebarLayout from "../components/layout/SidebarLayout";
import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Note from "../components/note/Note";
import AddButton from "../components/addButton/AddButton";
import "../styles/NotesPage.css";
import {createNote} from "../api/createNote";
import { getNotes } from "../api/getNotes";





export default function NotesPage() {
    const {id} = useParams();
    const [notes, setNotes] = useState([]);
    const [notebookName, setNotebookName] = useState("");
    const [notebookDescription, setNotebooDescription] = useState("");

    useEffect(() => {
        async function fetchNotes() {
            try {
                const data = await getNotes(id);
                setNotes(data.notes);
                setNotebookName(data.name);
                setNotebooDescription(data.description);
            }
            catch(error) {
                console.error("Error fetching the notes");
            }
        }
        fetchNotes();
    }, []);

    const handleCreateNote = async (formData, close, resetForm) => {
        try {
            const newNote = await createNote(formData.name, formData.description, formData.color, id);
            resetForm({ name: '', description: '', color: '#FAF15B' });
            close();
            setNotes((prev) => [{ ...newNote, isNew: true }, ...prev]);

        } catch(error) {
            close();
        }
    };

    const handleNoteDelete = (identificator) => {
        setNotes( (notes) => notes.filter((note) => note.id != identificator));
    };

    return (
        <SidebarLayout>
            <div className="notes-container">
                <div className="notes-header-container">
                    <div>
                        <h1>{notebookName}</h1>
                        <p className="notebook-description">{notebookDescription}</p>
                    </div>
                    <AddButton
                        onNotebookCreated={handleCreateNote}
                        action={"Note"}
                    />
                </div>
                <div className="notes-list">
                    {notes.map((note) => (
                        <Note
                            key={note.id}
                            title = {note.title}
                            content={note.content}
                            color={note.color}
                            id = {note.id}
                            author = {note.author}
                            created_at={note.created_at}
                            checked={note.checked}
                            notebookId = {id}
                            isNew = {note.isNew}
                            onDelete={handleNoteDelete}
                    
                        />
                    ))}
                </div>
            </div>
        </SidebarLayout>
    )

}