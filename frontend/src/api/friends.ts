import axios from "axios";
import { UserAccount } from "./users";

const API_IP = import.meta.env.VITE_API_IP; // importing ip from .env if exists
axios.defaults.baseURL = `http://${API_IP ? API_IP : "localhost"}:3000`; // setting base url as env server ip, or localhost if doesnt exist

export const sendFriendRequest = async (
    fromUser: UserAccount,
    toUser: UserAccount
): Promise<boolean> => {
    try {
        const response = await axios.patch(`/friends/add/${toUser.id}`, {
            id: fromUser.id,
        });

        if (response.status === 204) return true;
        else return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const acceptFriendRequest = async (
    acceptingUser: UserAccount,
    sendingUser: UserAccount
): Promise<boolean> => {
    try {
        const response = await axios.patch(
            `/friends/accept/${sendingUser.id}`,
            {
                id: acceptingUser.id,
            }
        );

        if (response.status === 204) return true;
        else return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};
