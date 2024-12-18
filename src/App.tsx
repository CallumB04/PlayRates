import './styles/App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import { fetchUserById, UserAccount } from "./api";
import { createContext, useContext } from 'react';

// creating context for user, to be accessed throughout whole application
const UserContext = createContext<UserAccount | null>(null);
export const useUser = () => useContext(UserContext);

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

    
    return (
		<UserContext.Provider value={user}>
			<Router basename="/PlayRates">
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
			</Router>
		</UserContext.Provider>
    )
}

export default App;
