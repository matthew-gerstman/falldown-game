import React from 'react';
import type { Bar as BarType } from '../types/game';
import { GAME_CONFIG } from '../types/game';

interface BarProps {
  bar: BarType;
}

export const Bar: React.FC<BarProps> = ({ bar }) => {
  const { CANVAS_WIDTH } = GAME_CONFIG;
  
  return (
    <>
      {/* Left section of bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: bar.y,
          width: bar.gapPosition,
          height: bar.height,
          backgroundColor: '#2196F3',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
      {/* Right section of bar */}
      <div
        style={{
          position: 'absolute',
          left: bar.gapPosition + bar.gapWidth,
          top: bar.y,
          width: CANVAS_WIDTH - (bar.gapPosition + bar.gapWidth),
          height: bar.height,
          backgroundColor: '#2196F3',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </>
  );
};
