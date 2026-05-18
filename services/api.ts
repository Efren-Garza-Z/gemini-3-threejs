const BASE_URL = "/api/proxy";

async function parseResponse(response: Response, defaultMessage: string) {
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await response.json().catch(() => ({})) : null;

    if (!response.ok) {
        if (response.status === 401) {
            if (typeof window !== "undefined") {
                const event = new CustomEvent("auth-expired", { 
                    detail: { message: (data && (data.error || data.message)) || defaultMessage } 
                });
                window.dispatchEvent(event);
            }
        }

        throw new Error(
            (data && (data.error || data.message)) || defaultMessage
        );
    }

    return data;
}

export interface SessionUser {
    id?: number;
    email: string;
    full_name: string;
    language_level?: string;
    target_language?: string;
}

export interface ApiNote {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    content: string;
}

export const apiService = {
    // Autenticación
    login: async (data: { email: string; password: string }) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return parseResponse(response, "Error al iniciar sesión");
    },

    googleAuth: async (token: string) => {
        const response = await fetch(`${BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        return parseResponse(response, "Error al autenticar con Google");
    },

    register: async (data: {
        email: string;
        password: string;
        full_name: string;
        language_level: string;
        target_language: string;
    }) => {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return parseResponse(response, "Error al registrar usuario");
    },

    forgotPassword: async (email: string) => {
        const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        return parseResponse(response, "Error al solicitar recuperación de contraseña");
    },

    resetPassword: async (
        token: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }),
        });

        return parseResponse(response, "Error al restablecer la contraseña");
    },

    updateUserPassword: async (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string,
        token: string
    ) => {
        const response = await fetch(`${BASE_URL}/users/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }),
        });

        return parseResponse(response, "Error al actualizar la contraseña");
    },

    updateUserLanguage: async (
        email: string,
        data: { language_level: string; target_language: string },
        token: string
    ) => {
        const response = await fetch(`${BASE_URL}/users/email/${encodeURIComponent(email)}/language`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        return parseResponse(response, "No se pudo actualizar el idioma del usuario");
    },

    getUserByEmail: async (email: string, token: string) => {
        const response = await fetch(`${BASE_URL}/users/email/${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return parseResponse(response, "No se pudo obtener la información del usuario");
    },

    getNotes: async (token: string): Promise<ApiNote[]> => {
        const response = await fetch(`${BASE_URL}/notes`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return parseResponse(response, "No se pudieron obtener los apuntes");
    },

    saveNote: async (content: string, token: string): Promise<ApiNote> => {
        const response = await fetch(`${BASE_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });

        return parseResponse(response, "No se pudo guardar el apunte");
    },

    deleteNote: async (id: string | number, token: string) => {
        const response = await fetch(`${BASE_URL}/notes/${id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el apunte");
        }

        return true;
    },

    // Chat legacy
    sendChat: async (prompt: string, token: string) => {
        const response = await fetch(`${BASE_URL}/learning/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                prompt,
                model: "gemini-2.5-flash",
            }),
        });

        return parseResponse(response, "Error al enviar mensaje al chat");
    },

    getHistory: async (token: string) => {
        const response = await fetch(`${BASE_URL}/learning/history`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });

        return parseResponse(response, "Error al obtener historial");
    },

    processExercise: async (prompt: string) => {
        const response = await fetch(`${BASE_URL}/gemini/process`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                model: "gemini-2.5-flash",
            }),
        });

        return parseResponse(response, "Error al iniciar procesamiento");
    },

    checkStatus: async (taskId: string) => {
        const response = await fetch(`${BASE_URL}/gemini/status/${taskId}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        });

        return parseResponse(response, "Error al consultar estado");
    },

    processFile: async (prompt: string, imagePath: string, token?: string) => {
        const imageResponse = await fetch(imagePath);
        const imageBlob = await imageResponse.blob();

        const formData = new FormData();
        formData.append("prompt", prompt);
        // Usamos una extensión genérica o extraída
        formData.append("file", imageBlob, "task_image.webp");

        const headers: any = {
            accept: "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/gemini/process-file`, {
            method: "POST",
            headers,
            body: formData,
        });

        return parseResponse(response, "Error al procesar el archivo");
    },

    checkFileStatus: async (taskId: string, token?: string) => {
        const headers: any = {
            accept: "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/gemini/status-file/${taskId}`, {
            method: "GET",
            headers,
        });

        return parseResponse(response, "Error al consultar el estado del archivo");
    },
    saveCompletedActivity: async (activityId: string | number, token: string) => {
        const response = await fetch(`${BASE_URL}/users/me/activities/${activityId}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return parseResponse(response, "No se pudo guardar el progreso de la actividad");
    },
    getCompletedActivities: async (token: string): Promise<string[]> => {
        const response = await fetch(`${BASE_URL}/users/me/activities`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return parseResponse(response, "No se pudieron obtener las actividades completadas");
    },
    getListeningTests: async (): Promise<ListeningTest[]> => {
        const response = await fetch(`${BASE_URL}/listening`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        });

        return parseResponse(response, "No se pudieron obtener los audios de listening");
    },

    getListeningTestById: async (id: string): Promise<ListeningTest> => {
        const response = await fetch(`${BASE_URL}/listening/${id}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        });

        return parseResponse(response, "No se pudo obtener el audio de listening");
    },

    analyzeListeningSection: async (prompt: string) => {
        const response = await fetch(`${BASE_URL}/gemini/process`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                model: "gemini-2.5-flash",
            }),
        });

        return parseResponse(response, "No se pudo analizar la sección de listening");
    },
};

export default function getTokenFromCookie() {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
}

export interface ListeningTest {
    id: string;
    title: string;
    audio_url: string;
    description: string;
    created_at: string;
    updated_at: string;
}