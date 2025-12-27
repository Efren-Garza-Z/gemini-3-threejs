const BASE_URL = "/api/proxy";

export const apiService = {
    // Autenticación
    login: (data: any) =>
        fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()),

    register: (data: any) =>
        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()),

    // Chat (Requiere Token)
    sendChat: (prompt: string, token: string) =>
        fetch(`${BASE_URL}/learning/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt })
        }).then(res => res.json()),

    // Historial (Para obtener la respuesta procesada)
    getHistory: (token: string) =>
        fetch(`${BASE_URL}/learning/history`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            }
        }).then(res => res.json())
};