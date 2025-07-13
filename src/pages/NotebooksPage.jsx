import SidebarLayout from "../components/layout/SidebarLayout";
import AddNotebooks from "../components/addNotebooks/AddNotebooks";
import Notebook from "../components/notebook/notebook";
import "../styles/NotebooksPage.css";

export default function NotebooksPage() {
    return (
        <SidebarLayout>
            <div className="notebooks-container">
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
        </SidebarLayout>
    );
}