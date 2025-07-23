import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function createNote(title, content, color, notebookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
            },
            body: JSON.stringify({title,content,color})
        });

        if (!response.ok) {
            throw new Error("Token expired or unauthorized");
        }

        return await response.json();
    }
    catch(error) {
        await refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");
         try {
            const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
                },
                body: JSON.stringify({title,content,color})
            });
        
            return await response.json();
        }
        catch (refreshError) {
            throw new Error("Token Not Valid");
        }

    }
    
}