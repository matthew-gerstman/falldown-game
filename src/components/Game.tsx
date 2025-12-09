import React from 'react';
import { Ball } from './Ball';
import { Bar } from './Bar';
import { useGame } from '../hooks/useGame';
import { useGameLoop } from '../hooks/useGameLoop';
import { GAME_CONFIG } from '../types/game';

const { CANVAS_WIDTH, CANVAS_HEIGHT, INITIAL_SPEED } = GAME_CONFIG;

export const Game: React.FC = () => {
  const { gameState, setGameState, keysPressed, resetGame } = useGame();
  useGameLoop(gameState, setGameState, keysPressed);

  const speedMultiplier = (gameState.speed / INITIAL_SPEED).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '10px', color: '#333', fontSize: '48px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Falldown
      </h1>
      
      {/* Score and Speed Display */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        marginBottom: '10px',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        <div style={{ color: '#2196F3' }}>
          Score: {gameState.score}
        </div>
        <div style={{ color: '#FF9800' }}>
          Speed: {speedMultiplier}x
        </div>
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
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <h2 style={{ fontSize: '48px', margin: '10px', textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
              Game Over!
            </h2>
            <p style={{ fontSize: '28px', margin: '10px' }}>
              Final Score: <strong>{gameState.score}</strong>
            </p>
            <p style={{ fontSize: '20px', margin: '5px', opacity: 0.9 }}>
              Max Speed: {speedMultiplier}x
            </p>
            <button
              onClick={resetGame}
              style={{
                marginTop: '30px',
                padding: '15px 40px',
                fontSize: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                fontWeight: 'bold',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            >
              Play Again
            </button>
            <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.7 }}>
              Press SPACE to restart
            </p>
          </div>
        )}
      </div>

      {/* Controls Info */}
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        color: '#333',
        fontSize: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
          🎮 <strong>Controls:</strong> Arrow Keys or A/D to move
        </p>
        <p style={{ margin: '5px 0' }}>
          Navigate through the gaps to score points!
        </p>
        <p style={{ margin: '5px 0', fontSize: '12px', opacity: 0.8 }}>
          The game gets faster as you progress
        </p>
      </div>
    </div>
  );
};
