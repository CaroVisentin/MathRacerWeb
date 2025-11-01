import type { PlayerProfileDto } from "../domain/playerProfileDto";

export interface PlayerProfile  {
    username: string;
    email: string;
    uid: string;
}

export interface PlayerContextValue {
  profile: PlayerProfileDto | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}
    