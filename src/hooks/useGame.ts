import { useState, useEffect, useCallback } from 'react';
import { GameState, Ball, Bar, GAME_CONFIG } from '../types/game';

const { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, BAR_HEIGHT, BAR_GAP_WIDTH, INITIAL_SPEED, BAR_SPACING } = GAME_CONFIG;

const createInitialBall = (): Ball => ({
  position: { x: CANVAS_WIDTH / 2, y: 100 },
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

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    ball: createInitialBall(),
    bars: [
      createBar(0, CANVAS_HEIGHT - BAR_SPACING),
      createBar(1, CANVAS_HEIGHT - BAR_SPACING * 2),
      createBar(2, CANVAS_HEIGHT - BAR_SPACING * 3),
      createBar(3, CANVAS_HEIGHT - BAR_SPACING * 4),
      createBar(4, CANVAS_HEIGHT - BAR_SPACING * 5),
    ],
    score: 0,
    gameOver: false,
    speed: INITIAL_SPEED,
  });

  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) {
        setKeysPressed((prev) => new Set(prev).add(e.key.toLowerCase()));
      }
      if (e.key === ' ' && gameState.gameOver) {
        resetGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.key.toLowerCase());
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameOver]);

  const resetGame = useCallback(() => {
    setGameState({
      ball: createInitialBall(),
      bars: [
        createBar(0, CANVAS_HEIGHT - BAR_SPACING),
        createBar(1, CANVAS_HEIGHT - BAR_SPACING * 2),
        createBar(2, CANVAS_HEIGHT - BAR_SPACING * 3),
        createBar(3, CANVAS_HEIGHT - BAR_SPACING * 4),
        createBar(4, CANVAS_HEIGHT - BAR_SPACING * 5),
      ],
      score: 0,
      gameOver: false,
      speed: INITIAL_SPEED,
    });
  }, []);

  return {
    gameState,
    setGameState,
    keysPressed,
    resetGame,
  };
};
