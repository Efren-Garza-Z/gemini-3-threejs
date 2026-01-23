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
            body: JSON.stringify({
                prompt: prompt,
                model: "gemini-3-flash-preview",
            })
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
            body: JSON.stringify({
                prompt: prompt,
                model: "gemini-3-flash-preview",
            })
        }).then(res => res.json()),

    // Consultar estado de la tarea
    checkStatus: (taskId: string, token: string) =>
        fetch(`${BASE_URL}/gemini/status/${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            }
        }).then(res => res.json()),

    updateUserLanguage: async (email: string, data: { language_level: string, target_language: string }, token: string) => {
        const response = await fetch(`${BASE_URL}/users/email/${encodeURIComponent(email)}/language`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    getUserByEmail: async (email: string, token: string) => {
        const response = await fetch(`${BASE_URL}/users/email/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("No se pudo obtener la información del usuario");
        return await response.json();
    },

    // MÉTODO PARA PROCESAR IMAGEN + TEXTO (Multipart)
    processFile: async (prompt: string, imagePath: string, token: string) => {
        // 1. Convertimos la ruta de la imagen en un archivo real (Blob)
        const imageResponse = await fetch(imagePath);
        const imageBlob = await imageResponse.blob();

        const formData = new FormData();
        formData.append('prompt', prompt);
        // 'file' es el nombre del campo que espera tu backend según el CURL
        formData.append('file', imageBlob, 'task_image.png');

        const response = await fetch(`${BASE_URL}/gemini/process-file`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
                // Nota: No poner Content-Type manual, el navegador lo hace con el boundary correcto
            },
            body: formData
        });

        if (!response.ok) throw new Error("Error al procesar el archivo");
        return await response.json(); // Retorna { task_id: "..." }
    },

    // MÉTODO PARA CONSULTAR STATUS DE ARCHIVO
    checkFileStatus: async (taskId: string, token: string) => {
        const response = await fetch(`${BASE_URL}/gemini/status-file/${taskId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("Error al consultar el estado del archivo");
        return await response.json(); // Retorna { status: "finalizado", result: "..." }
    }

};

export default function getTokenFromCookie() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1]
}
