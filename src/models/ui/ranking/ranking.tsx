export interface RankingPlayer {
  id: number;
  username: string;
  score: number;
  image: string;
  isOnline?: boolean; // estado opcional
}
