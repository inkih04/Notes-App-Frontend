import { API_BASE_URL } from './config';


export async function loginWithGoogleCode(code) {
    const response = await fetch(`${API_BASE_URL}/api/auth/google/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    }); 

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error('Failed to login with Google');
    }

    return await response.json();
}