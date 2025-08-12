import { API_BASE_URL } from './config';

export async function isServerUp() {
    const controller = new AbortController();
    const timeoout = setTimeout( () => controller.abort(), 2500);

    try {
        const response = await fetch(`${API_BASE_URL}/ping/`, {
            method: "GET",
            signal: controller.signal

        });

        clearTimeout(timeoout);

        return response.ok

    }
    catch (error) {
        clearTimeout(timeoout)
        return false;
    }
    
}