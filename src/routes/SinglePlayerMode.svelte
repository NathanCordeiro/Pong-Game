<script>
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { 
      initGame, 
      moveBall, 
      checkCollision, 
      updateScore,
      aiPaddleMovement
    } from '../lib/GameLogic.js';
  
    let canvas;
    let ctx;
    let game;
    let animationFrameId;
    let canvasWidth;
    let canvasHeight;
    let ballHitSound;
  
    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      game = initGame(canvasWidth, canvasHeight);
    }
  
    onMount(() => {
      // Sound setup
      ballHitSound = new Audio('/ball-hit.mp3');
  
      resizeCanvas();
      ctx = canvas.getContext('2d');
      window.addEventListener('resize', resizeCanvas);
  
      function gameLoop() {
        if (game.isGameOver) return;
  
        // Clear canvas
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Center line
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.setLineDash([15, 10]);
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);
        ctx.stroke();
        ctx.setLineDash([]);
  
        // Paddles
        ctx.fillStyle = 'white';
        ctx.fillRect(0, game.paddle1Y, 10, game.paddleHeight);
        ctx.fillRect(canvasWidth - 10, game.paddle2Y, 10, game.paddleHeight);
        
        // Ball with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
        ctx.beginPath();
        ctx.arc(game.ballX, game.ballY, game.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.shadowBlur = 0;
  
        // Scores
        ctx.font = '48px VT323';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(game.score1, canvasWidth / 4, 80);
        ctx.fillText(game.score2, 3 * canvasWidth / 4, 80);
  
        // AI Paddle Movement
        game = aiPaddleMovement(game, canvasHeight);
  
        // Game logic
        game = moveBall(game, canvasWidth, canvasHeight);
        const prevBallSpeedX = game.ballSpeedX;
        game = checkCollision(game, canvasWidth, canvasHeight);
        
        // Play sound on paddle hit
        if (prevBallSpeedX !== game.ballSpeedX) {
          ballHitSound.currentTime = 0;
          ballHitSound.play();
        }
  
        game = updateScore(game, canvasWidth);
  
        animationFrameId = requestAnimationFrame(gameLoop);
      }
  
      gameLoop();
  
      // Player controls
      const handleKeyDown = (e) => {
        const paddleSpeed = canvasHeight * 0.05;
        switch(e.key) {
          case 'w': 
            game.paddle1Y = Math.max(0, game.paddle1Y - paddleSpeed); 
            break;
          case 's': 
            game.paddle1Y = Math.min(canvasHeight - game.paddleHeight, game.paddle1Y + paddleSpeed); 
            break;
          case 'q': 
            game.isGameOver = true;
            cancelAnimationFrame(animationFrameId);
            navigate('/');
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('keydown', handleKeyDown);
        cancelAnimationFrame(animationFrameId);
      };
    });
  </script>
  
  <div class="game-wrapper">
    <canvas 
      bind:this={canvas} 
      class="game-canvas"
    ></canvas>
  </div>
  
  <style>
    .game-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #121212;
    }
  
    .game-canvas {
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: 16 / 9;
    }
  </style>