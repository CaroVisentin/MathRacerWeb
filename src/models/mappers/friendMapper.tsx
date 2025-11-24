import type { FriendDto } from "../domain/profile/friends/friendDto";
import type { PlayerProfileDto } from "../domain/profile/playerProfileDto";
import type { Friend } from "../ui/profile/friends/friend";
import { resolveImageUrl } from "../../shared/utils/imageResolver";

export const friendMapper = {
  fromDto(dto: FriendDto): Friend {
    return {
      id: dto.id,
      name: dto.name ?? "Jugador",
      email: dto.email,
      points: dto.points ?? 0,
      avatarUrl: resolveImageUrl("character", dto.character?.id),
      // carUrl: "/images/cars/1.png",
    };
  },

  fromDtoList(dtos: FriendDto[]): Friend[] {
    return dtos.map(friendMapper.fromDto);
  },

  fromPlayerProfileDto(dto: PlayerProfileDto): Friend {
    return {
      id: dto.id,
      name: dto.name ?? "Jugador",
      email: dto.email,
      points: dto.points ?? 0,
      avatarUrl: resolveImageUrl("character", dto.character?.id),
      // carUrl: "/images/cars/1.png",
    };
  },
};
