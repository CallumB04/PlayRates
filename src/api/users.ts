import users from "../data/users.json";

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
    games: GameList;
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
    return new Promise((resolve) => {
        setTimeout(() => resolve(users), 500);
    });
};

// fetches a specific user by the given user ID
export const fetchUserByID = async (
    id: number
): Promise<UserAccount | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(users.find((user) => user.id === id)), 500);
    });
};

// fetches a specific user by the given email
export const fetchUserByEmail = async (
    email: string
): Promise<UserAccount | undefined> => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve(
                    users.find(
                        (user) =>
                            user.email.toLowerCase() === email.toLowerCase()
                    )
                ),
            500
        );
    });
};

// fetches a specific user by the given username
export const fetchUserByUsername = async (
    username: string
): Promise<UserAccount | undefined> => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve(
                    users.find(
                        (user) =>
                            user.username.toLowerCase() ===
                            username.toLowerCase()
                    )
                ),
            500
        );
    });
};

// adds new user to user database
// currently non-functional until a database is used instead of local json files
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
            games: {
                played: [],
                playing: [],
                backlog: [],
                wishlist: [],
            },
            friends: [],
        };

        // add new user to users
        users.push(newUserAccount);

        // here the new user will be added to the database
        // due to current use of local json files this isnt currently possible
        // ...
    } catch (error: any) {
        throw new Error(`Error adding user: ${error.message}`);
    }
};
