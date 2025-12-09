import React from 'react';
import type { Ball as BallType } from '../types/game';

interface BallProps {
  ball: BallType;
}

export const Ball: React.FC<BallProps> = ({ ball }) => {
  const isMoving = Math.abs(ball.velocity.y) > 0.5;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: ball.position.x - ball.radius,
        top: ball.position.y - ball.radius,
        width: ball.radius * 2,
        height: ball.radius * 2,
        borderRadius: '50%',
        backgroundColor: isMoving ? '#4CAF50' : '#66BB6A',
        boxShadow: isMoving 
          ? '0 4px 12px rgba(76, 175, 80, 0.6)' 
          : '0 4px 8px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.2s',
        border: '2px solid rgba(255, 255, 255, 0.3)',
      }}
    />
  );
};
