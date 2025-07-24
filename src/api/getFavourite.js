import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';




export async function getFavourite() {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/fav/notes/`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Token expired");

        return await response.json();
    }
    catch(error) {
        refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");
        try {
            const retryResponse = await fetch(`${API_BASE_URL}/api/fav/notes/`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${retryToken}`,
                },
            });
            return await retryResponse.json();
        }
        catch (refreshError) {
            throw new Error("Token Not Valid");
        }
    }


}
    
