import { refreshToken } from "./refereshToken";

export async function deleteNotebook(id) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/notebooks/${id}/`, {
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
            const response = await fetch(`http://127.0.0.1:8000/api/notebooks/${id}/`, {
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