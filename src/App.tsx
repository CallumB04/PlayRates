import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { useEffect, useState } from 'react';

// Interface for the game data
// Will add further data for each game in future
export interface Game {
  id: number;
  title: string;
}

function App() {

  const [gamesData, setGamesData] = useState<Game[] | null>(null);

  // fetching game data from json
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch("/data/games.json");
        const gameData = await response.json();
        setGamesData(gameData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGameData();
  }, [])


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage gamesData={gamesData} />} />
      </Routes>
    </Router>
  )
}

export default App;
