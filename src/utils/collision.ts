import type { Ball, Bar } from '../types/game';
import { GAME_CONFIG } from '../types/game';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = GAME_CONFIG;

export const checkCollision = (ball: Ball, bar: Bar): boolean => {
  // Don't check collisions until ball is within the visible canvas
  if (ball.position.y > CANVAS_HEIGHT) {
    return false;
  }

  const ballBottom = ball.position.y + ball.radius;
  const ballTop = ball.position.y - ball.radius;
  const ballLeft = ball.position.x - ball.radius;
  const ballRight = ball.position.x + ball.radius;

  const barTop = bar.y;
  const barBottom = bar.y + bar.height;

  // Check if ball is at the same vertical level as the bar
  if (ballBottom >= barTop && ballTop <= barBottom) {
    // Check if ball is hitting the left section of the bar
    if (ballRight > 0 && ballLeft < bar.gapPosition) {
      return true;
    }
    // Check if ball is hitting the right section of the bar
    const rightSectionStart = bar.gapPosition + bar.gapWidth;
    if (ballRight > rightSectionStart && ballLeft < CANVAS_WIDTH) {
      return true;
    }
  }

  return false;
};

export const checkIfBallPassedBar = (ball: Ball, bar: Bar, previousBallY: number): boolean => {
  const ballBottom = ball.position.y + ball.radius;
  const previousBallBottom = previousBallY + ball.radius;
  const barTop = bar.y;

  // Check if ball just passed through the bar from above
  if (previousBallBottom <= barTop && ballBottom > barTop) {
    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;

    // Check if ball is within the gap
    if (ballLeft >= bar.gapPosition && ballRight <= bar.gapPosition + bar.gapWidth) {
      return true;
    }
  }

  return false;
};
