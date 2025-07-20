import SidebarLayout from "../components/layout/SidebarLayout";
import { useEffect, useState } from "react";
import Note from "../components/note/Note";
import "../styles/NotesPage.css";
import { getClosed } from "../api/getClosed";


export default function ClosedNotesPage() {
    const [notes, setNotes] = useState([]);


    useEffect(() => {
        async function fetchNotes() {
            try {
                const data = await getClosed();
                setNotes(data);

            }
            catch(error) {
                console.error("Error fetching the notes");
            }
        }
        fetchNotes();
    }, []);


    return (
        <SidebarLayout>
            <div className="notes-container">
                <div className="notes-header-container">
                    <div>
                        <h1> Closed Notes</h1>
                        <p className="notebook-description">Here you will find all your Closed notes.</p>
                    </div>
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
                            isNew = {note.isNew}
                            isFavourite={note.is_favourite}
                            hideDelete={true}
                            hideCheck={true}
  
                        />
                    ))}
                </div>
            </div>
        </SidebarLayout>
    )

}