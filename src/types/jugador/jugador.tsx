export interface Jugador {
    id: number;
    nombre: string;
    email: string;
    monedas: number;
    ultimoNivelId: number;
    puntos: number;
    eliminado: boolean;
}

export interface JugadorDto {
    nombreJugador: string;
    nivelJugador: number;
    autoId: number; // Para renderizar la imágen del auto
    puntos: number;
}