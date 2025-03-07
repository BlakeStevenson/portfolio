import { useState, useEffect } from 'react';

export const useSnakeGame = (history, setHistory) => {
  const [gameState, setGameState] = useState(null);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  const initializeSnakeGame = (play) => {
    const width = 10;
    const height = 10;
    const initialSnake = [{ x: 5, y: 5 }];
    const initialFood = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    const initialDirection = "RIGHT";

    setGameState({
      snake: initialSnake,
      food: initialFood,
      direction: initialDirection,
      width,
      height,
      score: 0,
      gameOver: false
    });

    setIsPlayingGame(true);
    return "Use WASD keys to move. Press 'q' to quit the game.";
  };

  const renderSnakeGame = (setHistory) => {
    if (!gameState) return null;

    let gameBoard = [];

    // Create empty board
    for (let y = 0; y < gameState.height; y++) {
      let row = [];
      for (let x = 0; x < gameState.width; x++) {
        row.push('·');
      }
      gameBoard.push(row);
    }

    // Place snake
    gameState.snake.forEach((segment, index) => {
      if (segment.x >= 0 && segment.x < gameState.width &&
        segment.y >= 0 && segment.y < gameState.height) {
        gameBoard[segment.y][segment.x] = index === 0 ? 'O' : 'o';
      }
    });

    // Place food
    gameBoard[gameState.food.y][gameState.food.x] = 'x';

    // Convert to string
    const boardString = gameBoard.map(row => row.join(' ')).join('\n');
    return (
      <div className="font-mono">
          <div className="mb-2">Score: {gameState.score}</div>
          <pre className="bg-gray-900 p-2 rounded">{boardString}</pre>
          <div className="mt-2">"Use WASD keys to move. Press 'q' to quit."</div>
      </div>
    );
  };

  useEffect(() => {
    if (!isPlayingGame || !gameState) return;
    const moveSnake = () => {
      const head = { ...gameState.snake[0] };

      // Move head according to direction
      switch (gameState.direction) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
        default: break;
      }

      // Check if game over (wall collision or self collision)
      const hitWall = head.x < 0 || head.x >= gameState.width || head.y < 0 || head.y >= gameState.height;
      const hitSelf = gameState.snake.some(segment => segment.x === head.x && segment.y === head.y);

      // Game Over :(
      if (hitWall || hitSelf) {
        setGameState({ ...gameState, gameOver: true});
        setIsPlayingGame(false);
        setHistory([...history, { command: 'snake', response: `Game over! Final score: ${gameState.score}. Type "snake" to play again.` }]);
        return;
      }

      // Check if food is eaten
      const eatFood = head.x === gameState.food.x && head.y === gameState.food.y;

      // Create new snake
      const newSnake = [head, ...gameState.snake];
      if (!eatFood) newSnake.pop();

      // Generate new food if eaten
      let newFood = gameState.food;
      let newScore = gameState.score;

      if (eatFood) {
        newScore++;
        newFood = {
          x: Math.floor(Math.random() * gameState.width),
          y: Math.floor(Math.random() * gameState.height)
        };
      }

      // Update game state
      setGameState({
        ...gameState,
        snake: newSnake,
        food: newFood,
        score: newScore
      });
    };

    const gameInterval = setInterval(moveSnake, 300);

    return () => clearInterval(gameInterval);
  }, [isPlayingGame, gameState]);

  // Game keyboard controls
  useEffect(() => {
    if (!isPlayingGame) return;

    const handleGameControls = (e) => {
      if (!gameState || gameState.gameOver) return;

      switch (e.key.toLowerCase()) {
        case 'w': setGameState({ ...gameState, direction: 'UP' }); break;
        case 'a': setGameState({ ...gameState, direction: 'LEFT' }); break;
        case 's': setGameState({ ...gameState, direction: 'DOWN' }); break;
        case 'd': setGameState({ ...gameState, direction: 'RIGHT' }); break;
        case 'q': setIsPlayingGame(false); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleGameControls);
    return () => window.removeEventListener('keydown', handleGameControls);
  }, [isPlayingGame, gameState]);

  return {
    gameState,
    isPlayingGame,
    setIsPlayingGame,
    initializeSnakeGame,
    renderSnakeGame
  };
};

export default useSnakeGame;