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
        }).then(res => res.json()),

    // Iniciar proceso de evaluación
    processExercise: (prompt: string, token: string) =>
        fetch(`${BASE_URL}/gemini/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt })
        }).then(res => res.json()),

    // Consultar estado de la tarea
    checkStatus: (taskId: string, token: string) =>
        fetch(`${BASE_URL}/gemini/status/${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            }
        }).then(res => res.json())
};

export default function getTokenFromCookie() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1]
}
