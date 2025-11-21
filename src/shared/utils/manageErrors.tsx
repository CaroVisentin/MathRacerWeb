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

/**
 * Obtiene un mensaje legible de cualquier error
 * @param error - Error recibido
 * @returns string - Mensaje de error
 */
export function getErrorMessage(error: unknown): string {
  let message = "Ocurrió un error desconocido";

  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  // console.error(error);
  return message;
}
