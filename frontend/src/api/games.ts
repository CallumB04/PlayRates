import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

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
}

// fetches whole games array
export const fetchGames = async (): Promise<Game[]> => {
    try {
        const response = await axios.get<Game[]>("/games");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching games");
    }
};

// fetches a specific game by the given game ID
export const fetchGameById = async (id: number): Promise<Game | undefined> => {
    try {
        const response = await axios.get<Game>(`/games/${id}`);

        return response.data;
    } catch (error) {
        throw new Error("Error fetching games");
    }
};
