import games from '../data/games.json';

/*
    This is a mock API that I am using during development to simulate API calls.
    This will make it easier to integrate a real database and API calls in the
    future. The fetches uses a timeout to simulate delay when making real API calls.
*/

/* Structure of game data in database */

export interface Game {
    id: number;
    title: string;
    trending: boolean; // temporary feature, in future will be based on weekly listings
    releaseDate: string; // stored in ISO 8601 format for easy Date object conversion
    listings: {
        played: number;
        playing: number;
        backlog: number;
        wishlist: number;
        overall: number;
    }; 
};

// fetches whole games array
export const fetchGames = async (): Promise<Game[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(games), 500);
    });
};

// fetches a specific game by the given game ID
export const fetchGameById = async (id: number): Promise<Game | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(games.find((game) => game.id === id)), 500);
    });
};