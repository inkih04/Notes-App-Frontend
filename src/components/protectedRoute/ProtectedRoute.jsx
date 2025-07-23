import { Navigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../../api/isTokenValid.js"; 
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { refreshToken } from "../../api/refereshToken.js";
import "./ProtectedRoute.css"; // Import the CSS for loading styles



function ProtectedRoute({children}) {
    const location = useLocation();
    const token = sessionStorage.getItem("tokenAccess");
    const [loading, setLoading] = useState(true);
    const [Valid, setValid] = useState(false);

    useEffect(() => {
        const checkToken = async () => {

            if (!token) {
                setLoading(false);
                setValid(false);
                return;
            }

            const isValid = await isTokenValid();

            if (isValid) {
                setValid(true);
                setLoading(false);
                return;
            }

            const isRefreshed = await refreshToken();

            if (isRefreshed) {
                setValid(true);
                setLoading(false);
                return;
            }
            else {
                setValid(false);
                setLoading(false);
                return;
            }
            
        };

        checkToken();
    }, [location.pathname, token]);

    if (loading) return (
            <div className="loading-container">
                <CircularProgress className="loading"/>
                <h2>Loading...</h2>
            </div>
    );

    if (!Valid) return <Navigate to="/" state={{ from: location }} replace />;

    return children;
}


export default ProtectedRoute;