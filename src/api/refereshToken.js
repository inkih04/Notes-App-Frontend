import { API_BASE_URL } from './config';

export async function refreshToken() {
    

    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refresh: sessionStorage.getItem("tokenRefresh")
            })  
        }
    );

    if (response.ok) {
        const data = await response.json();
        sessionStorage.removeItem("tokenAccess");
        sessionStorage.setItem( "tokenAccess", data.access);
        return true;
    }

    return false;
}