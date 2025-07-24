import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function deleteNotebook(id) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/notebooks/${id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error("Token Expired");
        
        return response.ok
    }
    catch(error) {
        refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");
        try {
            const response = await fetch(`${API_BASE_URL}/api/notebooks/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${retryToken}`,
                }
            });

            return response.ok

        }
        catch(refreshError) {
            throw new Error("Token Not Valid");
        }
    }
    
}