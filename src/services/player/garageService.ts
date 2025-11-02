import axios from "axios";
import { api } from "../network/api";

export type ProductTypeApi = "Auto" | "Personaje" | "Fondo";

export interface GarageItemDto {
  id: number; // player-item id
  productId: number; // catalog product id used for image mapping
  name: string;
  description: string;
  price: number;
  productType: ProductTypeApi;
  rarity: string;
  isOwned: boolean;
  isActive: boolean;
}

export interface GarageItemsResponseDto {
  items: GarageItemDto[];
  activeItem: GarageItemDto | null;
  itemType: ProductTypeApi;
}

export async function getPlayerCars(playerId: number) {
    try{
        const { data } = await api.get(`/garage/cars/${playerId}`);
        console.log("Data received:", data);
        return data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            console.error("Error fetching player cars:", error.response.data);
        } else {
            console.error("Error fetching player cars:", error);
        }
    }
}

export async function getPlayerCharacters(playerId: number) {
    try {
        const { data } = await api.get(`/garage/characters/${playerId}`);
        console.log("Data received:", data);
        return data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            console.error("Error fetching player characters:", error.response.data);
        } else {
            console.error("Error fetching player characters:", error);
        }
    }
}

export async function getPlayerBackgrounds(playerId: number) {
    try {
        const { data } = await api.get(`/garage/backgrounds/${playerId}`);
        console.log("Data received:", data);
        return data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            console.error("Error fetching player backgrounds:", error.response.data);
        } else {
            console.error("Error fetching player backgrounds:", error);
        }
    }
}

export async function activatePlayerItem(playerId: number, productId: number, productType: ProductTypeApi) {
  try {
      const { data } = await api.put(
          `/garage/players/${playerId}/items/${productId}/activate`,
          null,
          { params: { productType } }
      );
      return data;
  } catch (error) {
      console.error("Error activating player item:", error);
  }
}
