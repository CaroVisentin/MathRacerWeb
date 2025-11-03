import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";
import { api, API_URLS } from "../network/api";

export async function openRandomChest(): Promise<ChestResponseDto> {
    try {
        const response = await api.post<ChestResponseDto>(
            `${API_URLS.chest}/open/`
        )
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(message);
    }
}
