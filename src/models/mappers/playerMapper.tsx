import type { BackendPlayer, Player } from "../ui/player/player";

export function mapToUiPlayer(data: BackendPlayer): Player {
  return {
    id: data?.id ?? 0,
    name: data?.name ?? "",
    email: data?.email ?? "",
    lastLevelId: data?.lastLevelId ?? 0,
    points: data?.points ?? 0,
    coins: data?.coins ?? 0,
    background: data?.background ?? data?.equippedBackground ?? null,
    car: data?.car ?? data?.equippedCar ?? null,
    character: data?.character ?? data?.equippedCharacter ?? null,
    equippedBackground: data?.equippedBackground ?? data?.background ?? null,
    equippedCar: data?.equippedCar ?? data?.car ?? null,
    equippedCharacter: data?.equippedCharacter ?? data?.character ?? null,
  };
}
