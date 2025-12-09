import { useEffect, useRef } from 'react';
import { GameState, GAME_CONFIG } from '../types/game';

const { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, GRAVITY, BALL_MOVE_SPEED, SPEED_INCREMENT } = GAME_CONFIG;

export const useGameLoop = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  keysPressed: Set<string>
) => {
  const animationFrameId = useRef<number>();
  const lastScoreUpdate = useRef<number>(0);

  useEffect(() => {
    if (gameState.gameOver) return;

    const gameLoop = () => {
      setGameState((prevState) => {
        const newState = { ...prevState };
        const { ball, bars, speed } = newState;

        // Move ball horizontally based on keys
        if (keysPressed.has('arrowleft') || keysPressed.has('a')) {
          ball.position.x -= BALL_MOVE_SPEED;
        }
        if (keysPressed.has('arrowright') || keysPressed.has('d')) {
          ball.position.x += BALL_MOVE_SPEED;
        }

        // Keep ball within bounds
        ball.position.x = Math.max(BALL_RADIUS, Math.min(CANVAS_WIDTH - BALL_RADIUS, ball.position.x));

        // Apply gravity
        ball.velocity.y += GRAVITY;
        ball.position.y += ball.velocity.y;

        // Keep ball from going above screen
        if (ball.position.y < BALL_RADIUS) {
          ball.position.y = BALL_RADIUS;
          ball.velocity.y = 0;
        }

        // Move bars upward
        bars.forEach((bar) => {
          bar.y -= speed;
        });

        // Remove bars that went off screen and add new ones
        const visibleBars = bars.filter((bar) => bar.y > -bar.height);
        
        if (visibleBars.length < bars.length) {
          const highestBar = Math.min(...visibleBars.map((b) => b.y));
          const newBarY = highestBar - 120;
          const newBarId = Math.max(...bars.map((b) => b.id)) + 1;
          
          visibleBars.push({
            id: newBarId,
            y: newBarY,
            gapPosition: Math.random() * (CANVAS_WIDTH - 100),
            gapWidth: 100,
            height: 20,
          });

          // Increment score when bar passes
          newState.score += 1;
        }

        newState.bars = visibleBars;

        // Progressive difficulty
        newState.speed += SPEED_INCREMENT;

        // Check if ball fell off bottom
        if (ball.position.y > CANVAS_HEIGHT + BALL_RADIUS) {
          newState.gameOver = true;
        }

        return newState;
      });

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState.gameOver, keysPressed, setGameState]);
};
