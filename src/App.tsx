import './styles/App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import { fetchUserByID, UserAccount } from "./api";
import { createContext, useContext } from 'react';

// creating context for user, to be accessed throughout whole application
const UserContext = createContext<UserAccount | null>(null);
export const useUser = () => useContext(UserContext);

function App() {

    // user account in state
    const [user, setUser] = useState<UserAccount | null>(null);

	// fetching user id from localstorage
	// temporary feature for testing to simulate using cookies to remember user
	// will replace in future for security reasons	
	useEffect(() => {
		const userToken: string | null = localStorage.getItem("user_id");
		
		if (userToken) {
			loadUserByID(Number(userToken));
		}
	}, []);


	// function to fetch user account from API and change in state
	// will be passed to login / signup pages
    const loadUserByID = async (id: number) => {
		
		// fetching user with given ID
		const fetchedUser = await fetchUserByID(id);

		// sets user account in state when fetched
		if (fetchedUser) { 
			setUser(fetchedUser); 
		}
	};

	// function to sign out user
	// will be passed to all components that allow for signing out
	const signOutUser = () => {
		setUser(null);
		localStorage.removeItem("user_id");
	};

    
    return (
		<UserContext.Provider value={user}>
			<Router basename="/PlayRates">
				<Navbar signOutUser={signOutUser}/>
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
				<Footer />
			</Router>
		</UserContext.Provider>
    )
}

export default App;
