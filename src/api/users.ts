import users from '../data/users.json';

/*
    This is a mock API that I am using during development to simulate API calls.
    This will make it easier to integrate a real database and API calls in the
    future. The fetches uses a timeout to simulate delay when making real API calls.
*/

/* Structure of user data in database */

export interface GameLog {
    id: number; // log id, unique for all users
    gameId: number; // corresponding game id
    status: "played" | "playing" | "backlog" | "wishlist";
    rating?: number; // optional rating, in range of 1-10
}

export interface GameList {
    played: GameLog[];
    playing: GameLog[];
    backlog: GameLog[];
    wishlist: GameLog[];
}
  
export interface UserAccount {
    id: number;
    username: string; // account name, no spaces allowed, used in url too
    email: string;
    password: string; // temporary non-encrypted password for testing
    games: GameList;
}

// fetches whole users array
export const fetchUsers = async (): Promise<UserAccount[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(users), 500);
    });
;}

// fetches a specific user by the given user ID
export const fetchUserByID = async (id: number): Promise<UserAccount | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(users.find((user) => user.id === id)), 500);
    });
};