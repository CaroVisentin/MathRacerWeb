import { api } from "../network/api";
import type { StoreProductsResponse } from "../../models/domain/store/storeProductsResponseDto";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";

/**
 * Obtiene todos los autos disponibles en la tienda
 * @param playerId ID del jugador
 * @returns Lista de autos con información de propiedad
 */
export async function getCars(
  playerId: number
): Promise<StoreProductsResponse> {
  try {
    const { data } = await api.get(`/cars`, { params: { playerId } });
    return data;
  } catch (error) {
    console.error("Error al obtener los autos:", error);
    throw error;
  }
}

/**
 * Obtiene todos los personajes disponibles en la tienda
 * @param playerId ID del jugador
 * @returns Lista de personajes con información de propiedad
 */
export async function getCharacters(
  playerId: number
): Promise<StoreProductsResponse> {
  try {
    const { data } = await api.get(`/characters`, { params: { playerId } });
    return data;
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    throw error;
  }
}

/**
 * Obtiene todos los fondos disponibles en la tienda
 * @param playerId ID del jugador
 * @returns Lista de fondos con información de propiedad
 */
export async function getBackgrounds(
  playerId: number
): Promise<StoreProductsResponse> {
  try {
    const { data } = await api.get(`/backgrounds`, { params: { playerId } });
    return data;
  } catch (error) {
    console.error("Error al obtener los fondos:", error);
    throw error;
  }
}

/**
 * Compra un auto específico para el jugador
 * @param playerId ID del jugador
 * @param carId ID del auto
 */
export async function buyCar(playerId: number, carId: number): Promise<void> {
  try {
    await api.post(`/players/${playerId}/cars/${carId}`);
  } catch (error) {
    console.error("Error al comprar el auto:", error);
    throw error;
  }
}

/**
 * Compra un personaje específico para el jugador
 * @param playerId ID del jugador
 * @param characterId ID del personaje
 */
export async function buyCharacter(
  playerId: number,
  characterId: number
): Promise<void> {
  try {
    await api.post(`/players/${playerId}/characters/${characterId}`);
  } catch (error) {
    console.error("Error al comprar el personaje:", error);
    throw error;
  }
}

/**
 * Compra un fondo específico para el jugador
 * @param playerId ID del jugador
 * @param backgroundId ID del fondo
 */
export async function buyBackground(
  playerId: number,
  backgroundId: number
): Promise<void> {
  try {
    await api.post(`/players/${playerId}/backgrounds/${backgroundId}`);
  } catch (error) {
    console.error("Error al comprar el fondo:", error);
    throw error;
  }
}



/**
 * Obtiene todos los paquetes de monedas disponibles
 * @returns Lista de paquetes de monedas
 */
export async function getCoinsPackage(): Promise<CoinPackageDto[]> {
  try {
    const { data } = await api.get(`/coins/packages`);
    return data;
  } catch (error) {
    console.error("Error al obtener los paquetes de monedas:", error);
    throw error;
  }
}
