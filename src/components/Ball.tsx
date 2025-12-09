import React from 'react';
import { Ball as BallType } from '../types/game';

interface BallProps {
  ball: BallType;
}

export const Ball: React.FC<BallProps> = ({ ball }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: ball.position.x - ball.radius,
        top: ball.position.y - ball.radius,
        width: ball.radius * 2,
        height: ball.radius * 2,
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        transition: 'background-color 0.3s',
      }}
    />
  );
};
