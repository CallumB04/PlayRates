import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

/* Structure of user data in database */

export interface GameLog {
    id: number; // log id, unique for all users
    gameId: number; // corresponding game id
    status: string;
    rating?: number; // optional rating, in range of 1-10
}

export interface Friend {
    id: number;
    status: string; // "friend" | "request-sent" | "request-received"
}

export interface UserAccount {
    id: number;
    username: string; // account name, no spaces allowed, used in url too
    email: string;
    password: string; // temporary non-encrypted password for testing
    picture: string; // user profile picture. empty string if none
    bio: string; // user biography
    games: GameLog[];
    friends: Friend[];
}

// for accounts that have been created in signup form, to add to UserAccount interface with unique ID
export interface UserCreation {
    username: string;
    email: string;
    password: string;
}

// fetches whole users array
export const fetchUsers = async (): Promise<UserAccount[]> => {
    try {
        const response = await axios.get<UserAccount[]>("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users");
        throw error;
    }
};

// fetches a specific user by the given user ID
export const fetchUserByID = async (id: number): Promise<UserAccount> => {
    try {
        const response = await axios.get<UserAccount>(`/users/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user");
        throw error;
    }
};

// fetches a specific user by the given email
export const fetchUserByEmail = async (email: string): Promise<UserAccount> => {
    try {
        const response = await axios.get<UserAccount>(`/users/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user");
        throw error;
    }
};

// fetches a specific user by the given username
export const fetchUserByUsername = async (
    username: string
): Promise<UserAccount> => {
    try {
        const response = await axios.get<UserAccount>(
            `/users/username/${username}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching user");
        throw error;
    }
};

// adds new user to user database
export const addNewUser = async (newUser: UserCreation): Promise<void> => {
    try {
        // loading existing users
        const users = await fetchUsers();

        // creating new user account
        // using username, email and password from form input
        // setting user ID as new incremented value and empty games object
        const newUserAccount: UserAccount = {
            ...newUser,
            id: users.length,
            picture: "",
            bio: "",
            games: [],
            friends: [],
        };
    } catch (error: any) {
        throw new Error(`Error adding user: ${error.message}`);
    }
};
