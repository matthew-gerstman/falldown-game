import { useEffect, useRef } from 'react';
import type { GameState } from '../types/game';
import { GAME_CONFIG } from '../types/game';
import { checkCollision } from '../utils/collision';

const { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, GRAVITY, BALL_MOVE_SPEED, SPEED_INCREMENT, BAR_SPACING } = GAME_CONFIG;

export const useGameLoop = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  keysPressed: Set<string>
) => {
  const animationFrameId = useRef<number | undefined>(undefined);
  const keysPressedRef = useRef(keysPressed);
  
  useEffect(() => {
    keysPressedRef.current = keysPressed;
  }, [keysPressed]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const gameLoop = () => {
      setGameState((prevState) => {
        const newState = { ...prevState };
        const { ball, bars, speed } = newState;
        const keys = keysPressedRef.current;

        // Move ball horizontally
        if (keys.has('arrowleft') || keys.has('a')) {
          ball.position.x -= BALL_MOVE_SPEED;
        }
        if (keys.has('arrowright') || keys.has('d')) {
          ball.position.x += BALL_MOVE_SPEED;
        }

        ball.position.x = Math.max(BALL_RADIUS, Math.min(CANVAS_WIDTH - BALL_RADIUS, ball.position.x));

        // Apply gravity
        ball.velocity.y += GRAVITY;
        ball.position.y += ball.velocity.y;

        // Top boundary
        if (ball.position.y < BALL_RADIUS) {
          ball.position.y = BALL_RADIUS;
          ball.velocity.y = 0;
        }

        // Check collisions
        for (const bar of bars) {
          if (checkCollision(ball, bar)) {
            newState.gameOver = true;
            return newState;
          }
        }

        // Move bars upward
        bars.forEach((bar) => {
          bar.y -= speed;
        });

        // Manage bars and scoring
        const visibleBars = bars.filter((bar) => bar.y > -bar.height);
        
        if (visibleBars.length < bars.length) {
          const barsRemoved = bars.length - visibleBars.length;
          const highestBar = Math.min(...visibleBars.map((b) => b.y));
          
          for (let i = 0; i < barsRemoved; i++) {
            const newBarY = highestBar - BAR_SPACING * (i + 1);
            const newBarId = Math.max(...bars.map((b) => b.id)) + 1 + i;
            
            visibleBars.push({
              id: newBarId,
              y: newBarY,
              gapPosition: Math.random() * (CANVAS_WIDTH - 100),
              gapWidth: 100,
              height: 20,
            });
          }

          newState.score += barsRemoved;
        }

        newState.bars = visibleBars;
        newState.speed += SPEED_INCREMENT;

        // Bottom boundary - game over
        if (ball.position.y > CANVAS_HEIGHT + BALL_RADIUS) {
          newState.gameOver = true;
        }

        return newState;
      });

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current !== undefined) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState.gameOver, setGameState]);
};
