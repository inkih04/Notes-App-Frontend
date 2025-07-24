import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function deleteFavourite(idNote) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/fav/notes/${idNote}/`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Token expired or unauthorized");
        }

        return response.ok;
    }
    catch(error) {
        await refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");

        try {
            const retryResponse = await fetch(`${API_BASE_URL}/api/fav/notes/${idNote}/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${retryToken}`,
                },
            });

            return retryResponse.ok;
        }
        catch (refreshError) {
            throw new Error("Token Not Valid");
        }
    }

}