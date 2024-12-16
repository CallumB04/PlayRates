import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { useEffect, useState } from 'react';

// Structure for the game data
// Will add further data for each game in future
export interface Game {
  title: string;
}

// Structure for a user's log of a game
// Will fetch Game using the gameId
export interface GameLog {
  id: number;
  gameId: number;
  status: "played" | "playing" | "backlog" | "wishlist";
  rating?: number;
}

// Structure for game list in user account
export interface GameList {
  played: GameLog[];
  playing: GameLog[];
  backlog: GameLog[];
  wishlist: GameLog[];
}

// Structure for user account
// Currently uses json for easy development, will implement secure database in future
export interface UserAccount {
  id: number;
  accountName: string;
  email: string;
  password: string;
  games: GameList;
}


function App() {

  const [gamesData, setGamesData] = useState<Game[] | null>(null);
  const [userData, setUserData] = useState<UserAccount | null>(null);

  /* In the future, I will use a secure database to hold user and game data,
     however currently I am using local json files to simplify development */

  // fetch game data from json
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

  // fetch user data from json
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/user.json");
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage gamesData={gamesData} userData={userData}/>} />
      </Routes>
    </Router>
  )
}

export default App;
