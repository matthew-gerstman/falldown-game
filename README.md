# Falldown Game

A classic arcade-style Falldown game built with React and TypeScript.

## About

Control a ball falling through horizontal bars with gaps. Navigate left and right to pass through the gaps while the bars move upward. The game gets progressively harder as the bars move faster over time.

## Features

- ⚡ Built with React + TypeScript + Vite
- 🎮 Keyboard controls (Arrow keys or A/D)
- 📊 Progressive difficulty scaling
- 🎯 Score tracking system with high score persistence
- 🎨 Clean, minimal UI with visual feedback
- 📈 Speed multiplier display

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Game Controls

- **Left Arrow** or **A**: Move ball left
- **Right Arrow** or **D**: Move ball right
- **Space**: Restart game (when game over)

## Gameplay

1. Use arrow keys or A/D to move the ball left and right
2. Fall through the gaps in the horizontal bars
3. Avoid hitting the bars - collision ends the game
4. Score points for each bar you pass through
5. The game speed increases progressively as you play
6. Try to beat your high score!

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3 for animations
- LocalStorage for high score persistence

## Deployment

To deploy to GitHub Pages:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The game will be available at: `https://[username].github.io/falldown-game/`

Or deploy manually:
```bash
npm run build
# Upload the dist/ folder to your hosting service
```

## Game Mechanics

- **Gravity**: Ball falls naturally with physics-based gravity
- **Collision Detection**: Precise collision detection between ball and bars
- **Progressive Difficulty**: Speed increases by 0.05% per frame
- **Gap Generation**: Random gap positions for each new bar
- **Score System**: +1 point for each bar successfully passed

## Project Structure

```
src/
├── components/       # React components
│   ├── Ball.tsx     # Ball rendering with visual effects
│   ├── Bar.tsx      # Bar rendering with gap
│   └── Game.tsx     # Main game component
├── hooks/           # Custom React hooks
│   ├── useGame.ts   # Game state management
│   └── useGameLoop.ts # Game loop and physics
├── types/           # TypeScript types
│   └── game.ts      # Game type definitions
└── utils/           # Utility functions
    └── collision.ts # Collision detection logic
```

## Development Notes

This game was built with continuous development practices, featuring:
- 20+ meaningful commits showing development progression
- Type-safe TypeScript implementation
- Clean component architecture
- Performant game loop using requestAnimationFrame
- Responsive controls with keyboard event handling

---

Built with ❤️ using React and TypeScript
