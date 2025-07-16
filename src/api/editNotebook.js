import { refreshToken } from "./refereshToken";


export async function editNotebook(name, description, color, id) {
    const token = sessionStorage.getItem("tokenAccess");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/notebooks/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body:  JSON.stringify({name, description, color})
        });

        if (!response.ok) throw new Error("Token Expired");
        
        return  await response.json();

    }
    catch(error) {
        refreshToken();
        const retryToken = sessionStorage.getItem("tokenAccess");

        try {
            const retryResponse  =  await fetch(`http://127.0.0.1:8000/api/notebooks/${id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${retryToken}`,
                },
                body:  JSON.stringify(name, description, color)
            });
            return  await retryResponse.json();
        }
        catch(refreshError) {
            throw new Error("Token Not Valid");
        }
        


    }


}