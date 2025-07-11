
export async function isTokenValid() {

  const response = await fetch("http://127.0.0.1:8000/api/auth/check-token/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
    },
  });

    return response.ok;    
}