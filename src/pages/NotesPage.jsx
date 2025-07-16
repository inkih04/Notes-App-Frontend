import SidebarLayout from "../components/layout/SidebarLayout";
import { useParams } from "react-router-dom";
import Note from "../components/note/Note";
import "../styles/NotesPage.css";



export default function NotesPage() {
    const {id} = useParams();

    return (
        <SidebarLayout>
            <div className="notes-container">
                <div className="notes-header-container">
                    <div>
                        <h1>Notes</h1>
                        <p>desc</p>
                    </div>
                    <div>
                        <p> add </p>
                    </div>
                </div>
                <div className="notes-list">
                    <Note/>
                    <Note/>
                    <Note/>

                </div>
            </div>
        </SidebarLayout>
    )

}