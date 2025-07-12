import SideBar from "../components/sideBar/SideBar";
import "../styles/NotebooksPage.css";


export default function NotebooksPage() {
  return (
    <div className="notebooks-page">
      <SideBar/>
      <div className="notebooks-conatainer">
        <h1>Notebooks</h1>
        <p>This is the Notebooks page.</p>
      </div>
    </div>
  );
}