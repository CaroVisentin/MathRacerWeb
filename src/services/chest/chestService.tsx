import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";
import { api, API_URLS } from "../network/api";
import { manageError } from "../../shared/utils/manageErrors";

export async function openRandomChest(): Promise<ChestResponseDto> {
    try {
        const response = await api.post<ChestResponseDto>(
            `${API_URLS.chest}/open/`
        )
        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}


export async function openTutorialChest(): Promise<ChestResponseDto> {
    try {
        const response = await api.post<ChestResponseDto>(
            `${API_URLS.chest}/complete-tutorial/`
        )
        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}