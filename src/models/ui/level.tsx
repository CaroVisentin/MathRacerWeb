export interface Level {
  id: number;
  worldId: number;
  number: number;
}

export interface LevelMapProps {
  levels: Level[];
  nodePositions: { x: number; y: number }[];
  onLevelSelect?: (level: Level) => void;
  pathRef: React.Ref<SVGPathElement>;
}