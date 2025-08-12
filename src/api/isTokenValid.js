import { API_BASE_URL } from './config';

export async function isTokenValid() {
  

  const response = await fetch(`${API_BASE_URL}/api/auth/check-token/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
    },
  });

    return response.ok;    
}

