<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import TwoPlayerMode from './routes/TwoPlayerMode.svelte';
  import SinglePlayerMode from './routes/SinglePlayerMode.svelte';
</script>

<Router>
  <main class="game-container">
    <Route path="/" component={Home} />
    <Route path="/two-player" component={TwoPlayerMode} />
    <Route path="/single-player" component={SinglePlayerMode} />
  </main>
</Router>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #121212;
    font-family: 'VT323', monospace;
    overflow: hidden;
  }

  .game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    margin: auto;
  }
</style>