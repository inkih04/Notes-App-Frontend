import { refreshToken } from "./refereshToken";

export async function createNotebook(name, description, color) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch('http://127.0.0.1:8000/api/notebooks/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,

            },
            body: JSON.stringify({name, description, color})
        });
        if (!response.ok) {
            throw new Error("Token expired or unauthorized");
        }

        return await response.json();
    }
    catch(error) {
        await refreshToken();
        const token = sessionStorage.getItem("tokenAccess");

        try {
            const retryResponse = await fetch('http://127.0.0.1:8000/api/notebooks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,

                },
                body: JSON.stringify({name, description, color})
            });

            return await retryResponse.json();
        }
        catch (refreshError) {
            throw refreshError
        }
    }

}