import { useEffect, useRef } from 'react';
import type { GameState } from '../types/game';
import { GAME_CONFIG } from '../types/game';
import { checkCollision } from '../utils/collision';

const { CANVAS_WIDTH, BALL_RADIUS, GRAVITY, BALL_MOVE_SPEED, SPEED_INCREMENT, BAR_SPACING, BAR_GAP_WIDTH, BAR_HEIGHT } = GAME_CONFIG;

const MAX_VELOCITY = 15; // Cap velocity to prevent runaway acceleration

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
        
        // Cap velocity to prevent runaway acceleration
        ball.velocity.y = Math.min(ball.velocity.y, MAX_VELOCITY);
        
        ball.position.y += ball.velocity.y;

        // Top boundary - GAME OVER (ball gets pushed off the top)
        if (ball.position.y < BALL_RADIUS) {
          newState.gameOver = true;
          return newState;
        }

        // No bottom boundary - ball can fall below and will come back up with the bars

        // Check collisions with bars - ball passes through gaps or bounces off bars
        for (const bar of bars) {
          if (checkCollision(ball, bar)) {
            // Ball hit a bar - stop its downward motion
            ball.velocity.y = 0;
            // Push ball above the bar
            ball.position.y = bar.y - BALL_RADIUS;
          }
        }

        // Move bars upward
        bars.forEach((bar) => {
          bar.y -= speed;
        });

        // Manage bars and scoring
        // Remove bars that have moved off the top
        const visibleBars = bars.filter((bar) => bar.y > -bar.height);
        
        // Spawn new bars at the bottom as old ones disappear at the top
        if (visibleBars.length < bars.length) {
          const barsRemoved = bars.length - visibleBars.length;
          
          // Find the lowest bar (highest y value)
          const lowestBar = Math.max(...visibleBars.map((b) => b.y));
          
          for (let i = 0; i < barsRemoved; i++) {
            // Spawn new bars BELOW the lowest bar
            const newBarY = lowestBar + BAR_SPACING * (i + 1);
            const newBarId = Math.max(...bars.map((b) => b.id)) + 1 + i;
            
            visibleBars.push({
              id: newBarId,
              y: newBarY,
              gapPosition: Math.random() * (CANVAS_WIDTH - BAR_GAP_WIDTH),
              gapWidth: BAR_GAP_WIDTH,
              height: BAR_HEIGHT,
            });
          }

          newState.score += barsRemoved;
        }

        newState.bars = visibleBars;
        newState.speed += SPEED_INCREMENT;

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
