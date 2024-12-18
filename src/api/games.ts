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
    trending: boolean;
}

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

// fetches all games marked with trending
export const fetchTrendingGames = async (): Promise<Game[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(games.filter((game) => game.trending)), 500)
    });
};
