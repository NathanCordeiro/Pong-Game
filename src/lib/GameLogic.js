export function initGame(canvasWidth, canvasHeight) {
    return {
      ballX: canvasWidth / 2,
      ballY: canvasHeight / 2,
      ballRadius: 10,
      ballSpeedX: 5,
      ballSpeedY: 5,
      paddle1Y: canvasHeight / 2 - 50,
      paddle2Y: canvasHeight / 2 - 50,
      paddleWidth: 10,
      paddleHeight: 100,
      score1: 0,
      score2: 0,
      isGameOver: false,
      winningScore: 10
    };
  }
  
  export function moveBall(game, canvasWidth, canvasHeight) {
    game.ballX += game.ballSpeedX;
    game.ballY += game.ballSpeedY;
  
    // Bounce off top and bottom
    if (game.ballY - game.ballRadius <= 0 || 
        game.ballY + game.ballRadius >= canvasHeight) {
      game.ballSpeedY = -game.ballSpeedY;
    }
  
    return game;
  }
  
  export function checkCollision(game, canvasWidth, canvasHeight) {
    // Paddle 1 collision (left side)
    if (game.ballX - game.ballRadius <= game.paddleWidth && 
        game.ballY >= game.paddle1Y && 
        game.ballY <= game.paddle1Y + game.paddleHeight) {
      game.ballSpeedX = Math.abs(game.ballSpeedX);
      // Optional: Increase difficulty by adding spin
      game.ballSpeedY += (game.ballY - (game.paddle1Y + game.paddleHeight / 2)) * 0.1;
    }
  
    // Paddle 2 collision (right side)
    if (game.ballX + game.ballRadius >= canvasWidth - game.paddleWidth && 
        game.ballY >= game.paddle2Y && 
        game.ballY <= game.paddle2Y + game.paddleHeight) {
      game.ballSpeedX = -Math.abs(game.ballSpeedX);
      // Optional: Increase difficulty by adding spin
      game.ballSpeedY += (game.ballY - (game.paddle2Y + game.paddleHeight / 2)) * 0.1;
    }
  
    return game;
  }
  
  export function updateScore(game, canvasWidth) {
    // Score for player 2 (right side)
    if (game.ballX - game.ballRadius <= 0) {
      game.score2++;
      game = resetBall(game, canvasWidth);
    }
  
    // Score for player 1 (left side)
    if (game.ballX + game.ballRadius >= canvasWidth) {
      game.score1++;
      game = resetBall(game, canvasWidth);
    }
  
    // Check for game over
    if (game.score1 >= game.winningScore || game.score2 >= game.winningScore) {
      game.isGameOver = true;
    }
  
    return game;
  }
  
  export function resetBall(game, canvasWidth) {
    game.ballX = canvasWidth / 2;
    game.ballY = game.paddle1Y + game.paddleHeight / 2;
    game.ballSpeedX = game.ballSpeedX > 0 ? -5 : 5;
    game.ballSpeedY = Math.random() * 10 - 5; // Random vertical speed
    return game;
  }
  
  export function aiPaddleMovement(game, canvasHeight) {
    const paddleCenter = game.paddle2Y + game.paddleHeight / 2;
    
    // Simple AI tracking
    if (paddleCenter < game.ballY) {
      game.paddle2Y = Math.min(
        canvasHeight - game.paddleHeight, 
        game.paddle2Y + 5
      );
    } else if (paddleCenter > game.ballY) {
      game.paddle2Y = Math.max(0, game.paddle2Y - 5);
    }
  
    return game;
  }