export interface Position {
  x: number;
  y: number;
}

export interface Ball {
  position: Position;
  radius: number;
  velocity: { x: number; y: number };
}

export interface Bar {
  id: number;
  y: number;
  gapPosition: number;
  gapWidth: number;
  height: number;
}

export interface GameState {
  ball: Ball;
  bars: Bar[];
  score: number;
  gameOver: boolean;
  speed: number;
}

export const GAME_CONFIG = {
  CANVAS_WIDTH: 1200,  // 3x wider (was 400)
  CANVAS_HEIGHT: 600,
  BALL_RADIUS: 15,
  BAR_HEIGHT: 20,
  BAR_GAP_WIDTH: 150,  // Proportionally wider gap
  INITIAL_SPEED: 2,
  SPEED_INCREMENT: 0.0005,
  GRAVITY: 0.3,
  BALL_MOVE_SPEED: 8,
  BAR_SPACING: 120,
} as const;
