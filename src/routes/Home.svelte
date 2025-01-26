<script>
    import { navigate } from 'svelte-routing';
    import { fade } from 'svelte/transition';
    
    let showInstructions = false;
    
    const toggleInstructions = () => {
      showInstructions = !showInstructions;
    };
  </script>
  
  <div class="home-container">
    <div class="game-selection">
      <h1>PONG</h1>
      <div class="button-group">
        <button on:click={() => navigate('/two-player')}>
          Two Player Mode
        </button>
        <button on:click={() => navigate('/single-player')}>
          Single Player Mode
        </button>
        <button on:click={toggleInstructions}>
          {showInstructions ? 'Hide' : 'Game'} Instructions
        </button>
      </div>
  
      {#if showInstructions}
        <div class="instructions" transition:fade>
          <h2>Game Controls</h2>
          <div class="control-grid">
            <div class="control-item">
              <span class="key">W</span>
              <p>Left Paddle Up (Player 1)</p>
            </div>
            <div class="control-item">
              <span class="key">S</span>
              <p>Left Paddle Down (Player 1)</p>
            </div>
            <div class="control-item">
              <span class="key">↑</span>
              <p>Right Paddle Up (Player 2)</p>
            </div>
            <div class="control-item">
              <span class="key">↓</span>
              <p>Right Paddle Down (Player 2)</p>
            </div>
            <div class="control-item">
              <span class="key">Q</span>
              <p>Quit Game</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-width: 100vw;
      background-color: #121212;
      margin: 0;
      padding: 0;
      overflow: visible;
    }
  
    .game-selection {
      text-align: center;
      background-color: rgba(255,255,255,0.05);
      padding: 40px;
      border-radius: 10px;
      width: 80%;
      max-width: 500px;
    }
  
    h1 {
      color: white;
      font-family: 'VT323', monospace;
      font-size: 4rem;
      margin-bottom: 15px;
      text-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
  
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    button {
      font-family: 'VT323', monospace;
      font-size: 1.5rem;
      background-color: white;
      color: #121212;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 5px;
    }
  
    button:hover {
      background-color: #e0e0e0;
      transform: scale(1.05);
    }
  
    .instructions {
      margin-top: 20px;
      background-color: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 10px;
      text-align: left;
    }
  
    .control-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
  
    .control-item {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  
    .key {
      background-color: white;
      color: #121212;
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: bold;
      min-width: 40px;
      text-align: center;
    }
  
    h2 {
      color: white;
      font-family: 'VT323', monospace;
      margin-bottom: 15px;
    }
  </style>