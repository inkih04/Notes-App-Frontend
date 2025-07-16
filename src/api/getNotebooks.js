import { refreshToken } from "./refereshToken";


export async function getNotebooks() {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/notebooks/", {
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
            const retryResponse = await fetch("http://127.0.0.1:8000/api/notebooks/", {
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
    
