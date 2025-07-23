import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function editNote(notebookId, noteId, title, content,  checked, color) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/${noteId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body:  JSON.stringify({title, content, color, checked})
        });

        if (!response.ok) throw new Error("Token Expired");
        
        return  await response.json();

    }
    catch(error) {
        refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");

        try {
            const retryResponse  =  await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/${noteId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${retryToken}`,
                },
                body:  JSON.stringify({title, content, color, checked})
            });
            return  await retryResponse.json();
        }
        catch(refreshError) {
            throw new Error("Token Not Valid");
        }
        


    }

}