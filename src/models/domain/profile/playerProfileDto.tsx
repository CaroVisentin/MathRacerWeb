export interface PlayerProfileDto {
  id: number;
  name: string;
  email: string;
  lastLevelId: number;
  points: number;
  coins: number;
  character: {
    id: number;
  };
  car: {
    id: number;
  };
  background: {
    id: number;
  };
}
