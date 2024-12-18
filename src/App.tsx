import './styles/App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { fetchUserById, UserAccount } from "./api";


function App() {

    const [user, setUser] = useState<UserAccount | undefined>(undefined);

    useEffect(() => {
        const loadUser = async () => {
            const fetchedUser = await fetchUserById(0);

            if (fetchedUser) { 
                setUser(fetchedUser); 
            }
        };

        loadUser();
    }, []);

    if (!user) { 
      return <p className="text-center text-5xl text-textColor pt-20">Loading...</p>;
    }
    
    
    return (
        <Router basename="/PlayRates">
            <Navbar user={user}/>
            <Routes>
                <Route path='/' element={<HomePage user={user}/>} />
            </Routes>
        </Router>
    )
}

export default App;
