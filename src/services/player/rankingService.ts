import { api } from "../network/api";

export interface PlayerRankingDto {
  position: number;
  playerId: number;
  name: string;
  points: number;
}

export interface RankingTop10ResponseDto {
  top10: PlayerRankingDto[];
  currentPlayerPosition: number;
}

export async function getRankingTop10(playerId: number): Promise<RankingTop10ResponseDto> {
  const { data } = await api.get<RankingTop10ResponseDto>(`/ranking`, { params: { playerId } });
  return data;
}
