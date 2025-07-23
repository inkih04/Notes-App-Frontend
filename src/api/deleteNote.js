import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function deleteNote(notebookId, noteId) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/${noteId}/`, {
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
            const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/${noteId}/`, {
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