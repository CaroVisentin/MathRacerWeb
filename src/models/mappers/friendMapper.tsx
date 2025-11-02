import type { FriendDto } from "../domain/friendDto";
import type { PlayerProfileDto } from "../domain/playerProfileDto";
import type { Friend } from "../ui/friend";


export const friendMapper = {
  fromDto(dto: FriendDto): Friend {
    return {
      id: dto.id,
      name: dto.name ?? "Jugador",
      points: dto.points ?? 0,
      avatarUrl: `/images/characters/${dto.character.id}.png`,
      carUrl: "/images/cars/1.png",
    };
  },

  fromDtoList(dtos: FriendDto[]): Friend[] {
    return dtos.map(friendMapper.fromDto);
  },

  fromPlayerProfileDto(dto: PlayerProfileDto): Friend {
    return {
      id: dto.id,
      name: dto.name ?? "Jugador",
      points: dto.points ?? 0,
      avatarUrl: `/images/characters/${dto.character.id}.png`,
      carUrl: "/images/cars/1.png",
    };
  }
};