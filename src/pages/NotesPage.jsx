import SidebarLayout from "../components/layout/SidebarLayout";
import { useParams } from "react-router-dom";



export default function NotesPage() {
    const {id} = useParams();

    return (
        <SidebarLayout>
            <div>
                <h1>Notes Page</h1>
                <p>Caracolaaa</p>
            </div>
        </SidebarLayout>
    )

}