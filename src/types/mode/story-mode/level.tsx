export interface Level {
  id: number;
  mundoId: number;
  numero: number;
}

export interface LevelMapProps {
  levels: Level[];
  nodePositions: { x: number; y: number }[];
  onLevelSelect?: (level: Level) => void;
  pathRef: React.Ref<SVGPathElement>;
}