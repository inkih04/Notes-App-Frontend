
export async function loginWithGoogleCode(code) {
    const response = await fetch('http://127.0.0.1:8000/api/auth/google/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    }); //todo: change on production api url

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error('Failed to login with Google');
    }

    return await response.json();
}