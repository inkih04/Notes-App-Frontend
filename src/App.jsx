import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import NotebooksPage from "./pages/NotebooksPage.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";



export default function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/Notebooks" element={<ProtectedRoute> <NotebooksPage /> </ProtectedRoute> } />
                </Routes>
            </BrowserRouter>

    );
}