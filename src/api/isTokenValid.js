import { API_BASE_URL } from './config';

export async function isTokenValid() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-token/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
      },
    });

    if (response.status === 401) {
      return false;
    }
    
    return response.ok;
  } catch (error) {
    throw new Error(`Connection error: ${error.message}`);
  }
}