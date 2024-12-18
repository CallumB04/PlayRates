import './styles/App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { fetchUserById, UserAccount } from "./api";


function App() {

    // user account in state
    const [user, setUser] = useState<UserAccount | null>(null);

	// fetching user account from API
    useEffect(() => {
        const loadUser = async () => {
			// temporarily fetching user with ID: 0, for testing
            const fetchedUser = await fetchUserById(0);

			// sets user account in state when fetched
            if (fetchedUser) { 
                setUser(fetchedUser); 
            }
        };

        loadUser();
    }, []);

	// displays loading message until user account is loaded
	// later will remove this and load pages differently depending on if user is logged in or not
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
