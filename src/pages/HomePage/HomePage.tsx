import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, fetchUsers, Game, UserAccount } from "../../api";
import GameSection from "./components/GameSection";
import { useUser } from "../../App";
import { useEffect, useState } from "react";

// common styles for all game section titles in home page
const gameSectionTitleStyles = `text-textColor font-ssp font-normal tracking-wide
                                text-3xl md:text-4xl 2xl:text-[42px] uppercase mt-16 text-center
                                [&:not(:first-of-type)]:mt-24 [&:not(:first-of-type)]:2xl:mt-28`;

const HomePage = () => {
    // fetching user data from react context
    const user: UserAccount | null = useUser();
    const [userCount, setUserCount] = useState<number>(0);

    // loading user count
    useEffect(() => {
        const loadUserCount = async () => {
            const users = await fetchUsers();

            if (users) {
                setUserCount(users.length);
            }
        };

        loadUserCount();
    }, []);

    /* Fetching games data using React Query for caching */

    // fetching games from API
    const {
        data: games,
        error: gamesError,
        isLoading: gamesLoading,
    } = useQuery<Game[]>({
        queryKey: ["games"],
        queryFn: fetchGames,
    });

    return (
        <>
            <div className="flex flex-wrap gap-y-10 pt-8 sm:px-2 md:min-h-[50vh] md:px-8 xl:px-20">
                <div className="w-full md:w-1/2">
                    <h1 className="text-center font-ssp text-7xl font-bold text-textColor md:text-left md:text-8xl lg:text-[7rem] 2xl:text-[9rem]">
                        PlayRates
                    </h1>
                    <h2 className="ml-1 mt-3 text-center font-ssp text-2xl font-semibold text-[#cacaca] md:mt-5 md:text-left lg:text-3xl 2xl:mt-7 2xl:text-[38px]">
                        All of your games in one place...
                    </h2>

                    {/* Signup / login wrapper */}

                    {!user ? (
                        <div className="mx-auto mt-12 flex w-full flex-col items-center justify-center gap-4 overflow-x-visible md:mt-16 md:w-[140%] md:flex-row md:justify-start md:gap-3 lg:w-full 2xl:mt-20">
                            <Link
                                to="/signup"
                                className="rounded-lg bg-highlightPurple px-6 py-4 text-3xl font-semibold text-textColor transition-transform duration-200 hover:bg-highlightHover active:-translate-y-[2px] active:transform md:px-5 md:py-3 2xl:px-6 2xl:py-4 2xl:text-4xl"
                            >
                                Sign up
                            </Link>
                            <p className="text-xl font-light text-textColor 2xl:text-2xl">
                                or{" "}
                                <Link
                                    to="/login"
                                    className="underline hover:text-highlightPurple"
                                >
                                    log in
                                </Link>{" "}
                                if you have an account
                            </p>
                        </div>
                    ) : (
                        <p className="mt-12 text-center font-ssp text-[22px] font-thin italic text-textColor md:text-left md:text-2xl 2xl:mt-20 2xl:text-3xl">
                            Welcome back{" "}
                            <Link
                                to={`/user/${user.username}`}
                                className="font-normal transition-colors duration-100 hover:text-highlightPurple"
                            >
                                {user.username}
                            </Link>
                            !
                        </p>
                    )}
                </div>
                <div className="flex w-full items-center justify-evenly font-ssp text-xl text-textColor md:w-1/2 md:justify-between md:pl-10 md:pt-24 lg:justify-evenly lg:pt-0 lg:text-[22px] 2xl:text-3xl">
                    <div className="flex flex-col gap-y-1 text-center">
                        <i className="fa-solid fa-user text-3xl md:text-[32px] 2xl:text-4xl"></i>
                        <p>{userCount} Users</p>
                    </div>
                    <div className="flex flex-col gap-y-1 text-center">
                        <i className="fa-solid fa-gamepad text-3xl md:text-[32px] 2xl:text-4xl"></i>
                        <p>{games?.length || 0} Games</p>
                    </div>
                    <div className="flex flex-col gap-y-1 text-center">
                        <i className="fa-solid fa-chart-bar text-3xl md:text-[32px] 2xl:text-4xl"></i>
                        <p>
                            {games?.reduce((acc, el) => {
                                return acc + el.listings.overall;
                            }, 0) || 0}{" "}
                            Listings
                        </p>
                    </div>
                </div>
            </div>

            {/* Trending games */}
            <h2 className={gameSectionTitleStyles}>Trending Games</h2>
            <GameSection
                games={games?.filter((game) => game.trending)}
                loading={gamesLoading}
                error={gamesError}
            />

            {/* Most Popular games (by amount of user listings) */}
            <h2 className={gameSectionTitleStyles}>Most Popular</h2>
            <GameSection
                games={games
                    ?.sort((a, b) => b.listings.overall - a.listings.overall)
                    .slice(0, 6)}
                loading={gamesLoading}
                error={gamesError}
            />

            {/* Newly released games */}
            <h2 className={gameSectionTitleStyles}>New Releases</h2>
            <GameSection
                games={games
                    ?.sort(
                        (a, b) =>
                            Date.parse(b.releaseDate) -
                            Date.parse(a.releaseDate)
                    )
                    .slice(0, 6)}
                loading={gamesLoading}
                error={gamesError}
            />
        </>
    );
};

export default HomePage;
