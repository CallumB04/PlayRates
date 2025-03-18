import axios from "axios";

const API_IP = import.meta.env.VITE_API_IP; // importing ip from .env if exists
axios.defaults.baseURL = `http://${API_IP ? API_IP : "localhost"}:3000`; // setting base url as env server ip, or localhost if doesnt exist

export interface GameLog {
    id: number; // corresponding game id
    status: string; // played, playing, backlog, wishlist
    rating?: number; // optional rating, in range of 1-10
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
