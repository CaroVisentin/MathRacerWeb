export interface AuthUser {
    id: number;
    username: string;
    email: string;
    uid: string;
    // Añadir otros campos necesarios
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    username: string;
}