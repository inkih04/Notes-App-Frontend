import { refreshToken } from "./refereshToken";

export async function deleteFavourite(idNote) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/fav/notes/${idNote}/`, {
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
            const retryResponse = await fetch(`http://127.0.0.1:8000/api/fav/notes/${idNote}/`, {
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