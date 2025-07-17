import { refreshToken } from "./refereshToken";

export async function createNote(title, content, color, notebookId) {
    try {
        console.log("title:", title); 
        console.log("content:", content); 
        console.log("color:", color); 
        const response = await fetch(`http://127.0.0.1:8000/api/notebooks/${notebookId}/notes/`, {
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
            const response = await fetch(`http://127.0.0.1:8000/api/notebooks/${notebookId}/notes/`, {
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