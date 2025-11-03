import { AxiosError } from "axios";

/**
 * Maneja cualquier error, loguea y lanza un Error con mensaje legible
 * @param error - El error recibido
 */
export function manageError(error: unknown): never {
    let message = "Error desconocido";

    if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    // Loguea el error completo para debugging
    // console.error(error);

    // Lanza el error con mensaje legible
    throw new Error(message);
}
