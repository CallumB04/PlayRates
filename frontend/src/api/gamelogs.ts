import axios from "axios";

const API_IP = import.meta.env.VITE_API_IP; // importing ip from .env if exists
axios.defaults.baseURL = `http://${API_IP ? API_IP : "localhost"}:3000`; // setting base url as env server ip, or localhost if doesnt exist

export interface GameLog {
    id: number; // corresponding game id
    status: string; // played, playing, backlog, wishlist
    rating?: number; // range of 1-10, step of 0.25 (e.g: 6.25, 8.75, 3.5, 5.0)
    hoursPlayed?: number; // to 1 decimal point
    hoursToBeat?: number; // to 1 decimal point
    startDate?: string; // stored in ISO 8601 format for easy Date object conversion
    finishDate?: string; // stored in ISO 8601 format for easy Date object conversion
    platform?: string; // Steam, Xbox Game pass, etc
    achievementsTotal?: number; // achivement count of that game on that platform
    achievementsCompleted?: number; // number of unlocked achievements
}

export const fetchGameLogs = async () => {
    try {
        const response = await axios.get("/gamelogs");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching game logs");
    }
};

export const fetchGameLogsByUserID = async (userID: number) => {
    try {
        const response = await axios.get(`/gamelogs/${userID}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching game logs");
    }
};
