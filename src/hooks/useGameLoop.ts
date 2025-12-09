import { useEffect, useRef } from 'react';
import { GameState, GAME_CONFIG } from '../types/game';
import { checkCollision } from '../utils/collision';

const { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, GRAVITY, BALL_MOVE_SPEED, SPEED_INCREMENT, BAR_SPACING } = GAME_CONFIG;

export const useGameLoop = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  keysPressed: Set<string>
) => {
  const animationFrameId = useRef<number>();
  const previousBallY = useRef<number>(gameState.ball.position.y);

  useEffect(() => {
    if (gameState.gameOver) return;

    const gameLoop = () => {
      setGameState((prevState) => {
        const newState = { ...prevState };
        const { ball, bars, speed } = newState;

        // Store previous Y position
        const prevY = ball.position.y;

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

        // Check collisions with bars
        for (const bar of bars) {
          if (checkCollision(ball, bar)) {
            // Ball hit a bar - game over
            newState.gameOver = true;
            return newState;
          }

          // Check if ball successfully passed through gap
          const ballBottom = ball.position.y + ball.radius;
          const prevBallBottom = prevY + ball.radius;
          const barTop = bar.y;

          if (prevBallBottom <= barTop && ballBottom > barTop) {
            const ballLeft = ball.position.x - ball.radius;
            const ballRight = ball.position.x + ball.radius;

            // Ball passed through gap successfully
            if (ballLeft >= bar.gapPosition && ballRight <= bar.gapPosition + bar.gapWidth) {
              // Award points (handled when bar is removed)
            }
          }
        }

        // Move bars upward
        bars.forEach((bar) => {
          bar.y -= speed;
        });

        // Remove bars that went off screen and add new ones
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

          // Increment score for each bar passed
          newState.score += barsRemoved;
        }

        newState.bars = visibleBars;

        // Progressive difficulty - speed increases over time
        newState.speed += SPEED_INCREMENT;

        // Check if ball fell off bottom
        if (ball.position.y > CANVAS_HEIGHT + BALL_RADIUS) {
          newState.gameOver = true;
        }

        previousBallY.current = ball.position.y;

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
