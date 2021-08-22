import './App.css';
import { useState } from 'react';
import LandingPage from './Components/LandingPage/LandingPage'
import GamePage from './Components/GamePage/GamePage'
import EndGamePage from './Components/EndGamePage/EndGamePage';

enum GameState {
  LANDING = 'landing',
  GAME = 'game',
  ENDGAME = 'endgame'
}

function App() {

  const [gameState, setGameState] = useState<GameState>(GameState.LANDING)

  const gameStarting = () => setGameState(GameState.GAME)
  // eslint-disable-next-line
  const gameEnding = () => setGameState(GameState.ENDGAME)

  const getGameStatePage = () => {
    switch(gameState) {
      case GameState.LANDING:
        return <LandingPage gameStarting={gameStarting}/>
      case GameState.GAME:
        return <GamePage/>
      case GameState.ENDGAME: 
        return <EndGamePage/>
    }
  }

  return (
    <div className="App">
      {getGameStatePage()}
    </div>
  );
}

export default App;
