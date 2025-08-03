export async function isTokenValid() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500); 

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-token/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("tokenAccess")}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 401) {
      return false;
    }

    return response.ok;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Timeout: servidor no responde en este intento.");
      throw new Error("Timeout: Server waking up");
    }
    if (response.status === 401) {
      return false;
    }
  }
}
