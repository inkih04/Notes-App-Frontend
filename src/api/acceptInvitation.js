import { refreshToken } from "./refereshToken";
import { API_BASE_URL } from './config';

export async function acceptInvitation(token) {
    const accessToken = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`${API_BASE_URL}/api/notebooks/accept-invitation/${token}/`, {
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
            const retryResponse = await fetch(`${API_BASE_URL}/api/notebooks/accept-invitation/${token}/`, {
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
