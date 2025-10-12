// Conexión en tiempo real

export const signalRUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_SIGNALR_URL_LOCAL
        : import.meta.env.VITE_SIGNALR_URL_LOCAL; // Actualizar