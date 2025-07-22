import { refreshToken } from "./refereshToken";

export async function acceptInvitation(token) {
    const accessToken = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/notebooks/accept-invitation/${token}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Token expired or unauthorized");
        }

        return await response.json();
    }
    catch (error) {
        await refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");

        try {
            const retryResponse = await fetch(`http://127.0.0.1:8000/api/notebooks/accept-invitation/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
