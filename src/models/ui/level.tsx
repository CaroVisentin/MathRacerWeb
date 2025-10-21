export interface Level {
  id: number;
  worldId: number;
  number: number;
  unlocked: boolean;
  completed: boolean;
  stars: number;
}

export interface LevelMapProps {
  levels: Level[];
  className?: string;
}