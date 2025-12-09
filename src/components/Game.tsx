import React from 'react';
import { Ball } from './Ball';
import { Bar } from './Bar';
import { useGame } from '../hooks/useGame';
import { useGameLoop } from '../hooks/useGameLoop';
import { GAME_CONFIG } from '../types/game';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = GAME_CONFIG;

export const Game: React.FC = () => {
  const { gameState, setGameState, keysPressed, resetGame } = useGame();
  useGameLoop(gameState, setGameState, keysPressed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '10px', color: '#333' }}>Falldown</h1>
      
      {/* Score Display */}
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '10px',
        color: '#2196F3'
      }}>
        Score: {gameState.score}
      </div>

      {/* Game Canvas */}
      <div
        style={{
          position: 'relative',
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          backgroundColor: '#f0f0f0',
          border: '3px solid #333',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        }}
      >
        {/* Render bars */}
        {gameState.bars.map((bar) => (
          <Bar key={bar.id} bar={bar} />
        ))}

        {/* Render ball */}
        <Ball ball={gameState.ball} />

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <h2 style={{ fontSize: '48px', margin: '10px' }}>Game Over!</h2>
            <p style={{ fontSize: '24px', margin: '10px' }}>Final Score: {gameState.score}</p>
            <button
              onClick={resetGame}
              style={{
                marginTop: '20px',
                padding: '15px 30px',
                fontSize: '18px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            >
              Play Again
            </button>
            <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.8 }}>
              Press SPACE to restart
            </p>
          </div>
        )}
      </div>

      {/* Controls Info */}
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p><strong>Controls:</strong> Arrow Keys or A/D to move</p>
        <p>Navigate through the gaps to score points!</p>
      </div>
    </div>
  );
};
