import React, {useEffect, useState} from "react";
import SidebarLayout from "../components/layout/SidebarLayout";
import AddNotebooks from "../components/addNotebooks/AddNotebooks";
import Notebook from "../components/notebook/Notebook";
import { getNotebooks } from "../api/getNotebooks";
import "../styles/NotebooksPage.css";

export default function NotebooksPage() {
    const [notebooks, setNotebooks] = useState([]);

    useEffect(() => {
        async function fetchNotebooks() {
            try {
                const data = await getNotebooks();
                setNotebooks(data);
            }
            catch(error) {
                console.error("Error fetching the notebooks");
            }
        }
        fetchNotebooks();
    }, []);

    const handleNotebookCreated = (newNotebook) => {
        setNotebooks(
            (prev) => [...prev, newNotebook]
        );
    };

    const handleNotebookDelete = (id) => {
        setNotebooks( (notebooks) => notebooks.filter((notebook) => notebook.id != id));

    };

    const handleNotebookEdit = (editedNotebook) => {
        setNotebooks(notebooks => notebooks.map(
            notebook => notebook.id === editedNotebook.id ? editedNotebook:notebook
        ));

    };

    
    return (
        <SidebarLayout>
            <div className="notebooks-container">
                <div className="notebooks-header-conatainer">
                    <div>
                        <h1>Notebooks</h1>
                        <p>No notebooks available.</p>
                    </div>
                    <AddNotebooks onNotebookCreated = {handleNotebookCreated}/>
                </div>
                <div className="notebooks-list">
                    {notebooks.map((notebook) => (
                        <Notebook
                            key={notebook.id}
                            name = {notebook.name}
                            description={notebook.description}
                            color={notebook.color}
                            id = {notebook.id}
                            isShared = {notebook.is_shared}
                            onDelete={handleNotebookDelete}
                            onEdit={handleNotebookEdit}                        
                        />
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
}