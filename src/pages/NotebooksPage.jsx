import SideBar from "../components/sideBar/SideBar";
import AddNotebooks from "../components/addNotebooks/AddNotebooks";
import Notebook from "../components/notebook/notebook";
import "../styles/NotebooksPage.css";
import { useState } from "react"; // Solo agregar esta importación

export default function NotebooksPage() {
    // Solo agregar estas 2 líneas
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleSidebarToggle = (isCollapsed) => setSidebarCollapsed(isCollapsed);

    return (
        <div className="notebooks-page">
            <SideBar onToggle={handleSidebarToggle} /> {/* Solo agregar la prop */}
            <div className={`notebooks-container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}> {/* Solo agregar las clases */}
                <div className="notebooks-header-conatainer">
                    <div>
                        <h1>Notebooks</h1>
                        <p>No notebooks available.</p>
                    </div>
                    
                    <AddNotebooks/>
                </div>
                <div className="notebooks-list">
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                    <Notebook/>
                </div>
            </div>
        </div>
    );
}