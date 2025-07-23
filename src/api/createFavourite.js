import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';



export async function createFavourite(note) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/fav/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,

            },
            body: JSON.stringify({note})
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
            const retryResponse = await fetch(`${API_BASE_URL}/api/fav/notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${retryToken}`,

                },
                body: JSON.stringify({note})
            });

            return await retryResponse.json();
        }
        catch (refreshError) {
            throw new Error("Token Not Valid");
        }
    }

}