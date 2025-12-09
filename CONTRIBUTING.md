# Contributing to Falldown Game

Thank you for your interest in contributing to the Falldown game!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/falldown-game.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Commit with a clear message: `git commit -m "Add: description of your changes"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add comments for complex logic
- Keep components small and focused

## Game Mechanics

When modifying game mechanics, consider:
- **Balance**: Changes should maintain fair difficulty progression
- **Performance**: Game loop must run smoothly at 60 FPS
- **User Experience**: Controls should feel responsive

## Testing

Before submitting:
- [ ] Game runs without errors
- [ ] TypeScript compiles successfully: `npm run build`
- [ ] Game mechanics work as expected
- [ ] High score persists correctly
- [ ] Keyboard controls are responsive

## Pull Request Guidelines

- Describe what your PR does
- Include screenshots/GIFs for visual changes
- Reference any related issues
- Keep PRs focused on a single feature/fix

## Questions?

Feel free to open an issue for any questions or discussions!
