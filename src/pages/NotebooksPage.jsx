import React, {useEffect, useState} from "react";
import SidebarLayout from "../components/layout/SidebarLayout";
import AddNotebooks from "../components/addButton/AddButton";
import Notebook from "../components/notebook/Notebook";
import { getNotebooks } from "../api/getNotebooks";
import "../styles/NotebooksPage.css";
import { createNotebook } from "../api/createNotebook";

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

    const handleNotebookCreated = async (formData, close, resetForm) => {
        try {
            const newNotebook = await createNotebook(formData.name, formData.description, formData.color);
            console.log('Notebook data:', formData);
            resetForm({ name: '', description: '', color: '#FAF15B' });
            close();
            setNotebooks((prev) => [...prev, newNotebook]);
        } catch (error) {
            console.error("Error creating notebook:", error);
            close();
        }
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
                    <AddNotebooks onNotebookCreated = {handleNotebookCreated} action = {"Notebook"}/>
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