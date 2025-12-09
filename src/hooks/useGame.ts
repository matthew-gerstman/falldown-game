import { useState, useCallback, useEffect } from 'react';
import type { GameState, Ball, Bar } from '../types/game';
import { GAME_CONFIG } from '../types/game';
import { useGameLoop } from './useGameLoop';

const { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, BAR_GAP_WIDTH, BAR_HEIGHT, BAR_SPACING, INITIAL_SPEED } = GAME_CONFIG;

const createInitialBall = (): Ball => ({
  position: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 4 }, // Start in upper area
  radius: BALL_RADIUS,
  velocity: { x: 0, y: 0 },
});

const createBar = (id: number, y: number): Bar => ({
  id,
  y,
  gapPosition: Math.random() * (CANVAS_WIDTH - BAR_GAP_WIDTH),
  gapWidth: BAR_GAP_WIDTH,
  height: BAR_HEIGHT,
});

const getHighScore = (): number => {
  const saved = localStorage.getItem('falldown-highscore');
  return saved ? parseInt(saved, 10) : 0;
};

export const useGame = () => {
  const [highScore, setHighScore] = useState(getHighScore());
  const [gameState, setGameState] = useState<GameState>({
    ball: createInitialBall(),
    bars: [
      // Start bars much lower, below the ball
      createBar(0, CANVAS_HEIGHT - BAR_SPACING + 60),     // y=540
      createBar(1, CANVAS_HEIGHT - BAR_SPACING * 2 + 60), // y=420
      createBar(2, CANVAS_HEIGHT - BAR_SPACING * 3 + 60), // y=300
      createBar(3, CANVAS_HEIGHT - BAR_SPACING * 4 + 60), // y=180
      createBar(4, CANVAS_HEIGHT - BAR_SPACING * 5 + 60), // y=60
    ],
    score: 0,
    gameOver: false,
    speed: INITIAL_SPEED,
  });

  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  // Save high score when game ends
  useEffect(() => {
    if (gameState.gameOver && gameState.score > highScore) {
      setHighScore(gameState.score);
      localStorage.setItem('falldown-highscore', gameState.score.toString());
    }
  }, [gameState.gameOver, gameState.score, highScore]);

  const resetGame = useCallback(() => {
    setGameState({
      ball: createInitialBall(),
      bars: [
        createBar(0, CANVAS_HEIGHT - BAR_SPACING + 60),
        createBar(1, CANVAS_HEIGHT - BAR_SPACING * 2 + 60),
        createBar(2, CANVAS_HEIGHT - BAR_SPACING * 3 + 60),
        createBar(3, CANVAS_HEIGHT - BAR_SPACING * 4 + 60),
        createBar(4, CANVAS_HEIGHT - BAR_SPACING * 5 + 60),
      ],
      score: 0,
      gameOver: false,
      speed: INITIAL_SPEED,
    });
  }, []);

  return {
    gameState,
    setGameState,
    resetGame,
    keysPressed,
    setKeysPressed,
    highScore,
  };
};

export { useGameLoop };
