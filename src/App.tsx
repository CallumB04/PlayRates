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

	// function to fetch user account from API and change in state
	// will be passed to login / signup pages
    const loadUserByID = async (id: number) => {
		
		// fetching user with given ID
		const fetchedUser = await fetchUserById(id);

		// sets user account in state when fetched
		if (fetchedUser) { 
			setUser(fetchedUser); 
		}
	};

	// function to sign out user
	// will be passed to all components that allow for signing out
	const signOutUser = () => {
		setUser(null);
	}
	
	// temporarily initialising user with ID: 0, for testing
	useEffect(() => {
		loadUserByID(0);
	}, [])

    
    return (
		<UserContext.Provider value={user}>
			<Router basename="/PlayRates">
				<Navbar signOutUser={signOutUser}/>
				<Routes>
					<Route path='/' element={<HomePage signOutUser={signOutUser}/>} />
				</Routes>
			</Router>
		</UserContext.Provider>
    )
}

export default App;
