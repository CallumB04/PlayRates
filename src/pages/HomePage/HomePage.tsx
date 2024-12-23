import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, fetchUsers, Game, UserAccount } from "../../api";
import GameSection from "./components/GameSection";
import { useUser } from "../../App";
import { useEffect, useState } from "react";

// common styles for all game section titles in home page
const gameSectionTitleStyles = `text-textColor font-ssp font-normal tracking-wide
                                text-3xl md:text-4xl uppercase mt-16 text-center`;

const HomePage = () => {

    // fetching user data from react context
    const user: UserAccount | null = useUser();
    const [userCount, setUserCount] = useState<number>(0);

    // loading user count
    useEffect(() => {
        const loadUserCount = async() => {
            const users = await fetchUsers();
            
            if (users) {
                setUserCount(users.length);
            }
        }

        loadUserCount();
    }, [])

    /* Fetching games data using React Query for caching */

    // fetching games from API
    const { data: games, error: gamesError, isLoading: gamesLoading } = useQuery<Game[]>({
        queryKey: ['games'],
        queryFn: fetchGames,
    });

    return (
        <main className="px-4 sm:px-8 py-24 md:py-32">
            <div className="sm:px-2 md:px-8 xl:px-20 md:min-h-[50vh] flex flex-wrap gap-y-10">
                <div className="w-full md:w-1/2">
                    <h1 className="font-ssp font-bold text-7xl md:text-8xl lg:text-[7rem] text-textColor
                                text-center md:text-left">PlayRates</h1>
                    <h2 className="font-ssp font-semibold text-2xl lg:text-3xl text-[#cacaca]
                                ml-1 mt-3 md:mt-5 text-center md:text-left">All of your games in one place...</h2>
    
                    {/* Signup / login wrapper */}
    
                    {!user ? 
                    <div className="w-full mx-auto flex flex-col md:flex-row justify-center md:justify-start 
                                    gap-4 md:gap-3 items-center mt-12 md:mt-16">
                        <Link to="/signup" className="px-6 py-4 md:px-5 md:py-3 bg-highlightPurple text-textColor
                                                    text-3xl font-semibold
                                                    hover:bg-purple-500 active:transform active:-translate-y-[2px]
                                                    transition-transform duration-200 rounded-lg">
                            Sign up
                        </Link>
                        <p className="text-textColor font-light text-xl">
                            or  <Link to="/login" className="underline hover:text-highlightPurple">
                            log in</Link> if you have an account
                        </p>
                    </div>
                    : <p className="text-center md:text-left text-xl md:text-2xl italic font-thin font-ssp mt-12 text-textColor">
                        Welcome back <Link to={`/user/${user.username}`} 
                                           className="font-normal hover:text-highlightPurple transition-colors
                                                      duration-100">{user.username}</Link>!
                    </p>}
                </div>
                <div className="w-full md:w-1/2 md:pl-10 flex justify-evenly items-center text-textColor text-xl font-ssp
                                md:pt-24 lg:pt-0 lg:text-[22px]">
                    <div className="flex flex-col text-center gap-y-1">
                        <i className="fa-solid fa-user text-3xl md:text-[32px]"></i>
                        <p>{userCount} Users</p>
                    </div>
                    <div className="flex flex-col text-center gap-y-1">
                        <i className="fa-solid fa-gamepad text-3xl md:text-[32px]"></i>
                        <p>{games?.length} Games</p>
                    </div>
                    <div className="flex flex-col text-center gap-y-1">
                        <i className="fa-solid fa-chart-bar text-3xl md:text-[32px]"></i>
                        <p>
                            {games?.reduce((acc, el) => {
                                return acc + el.listings.overall;
                            }, 0)} Listings
                        </p>
                    </div>
                </div>
            </div>

            {/* Trending games */}
            <h2 className={gameSectionTitleStyles}>Trending Games</h2>
            <GameSection games={games?.filter((game) => game.trending)} loading={gamesLoading} error={gamesError}/>

            {/* Most Popular games (by amount of user listings) */}
            <h2 className={gameSectionTitleStyles}>Most Popular</h2>
            <GameSection games={games?.sort((a, b) => b.listings.overall - a.listings.overall)
                                      .slice(0, 6)
            } loading={gamesLoading} error={gamesError}/>

            {/* Most recent games (by order of release date) */}
            <h2 className={gameSectionTitleStyles}>Most Recent</h2>
            <GameSection games={games?.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
                                      .slice(0, 6)
            } loading={gamesLoading} error={gamesError}/>

        </main>
    );
}

export default HomePage;