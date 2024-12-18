import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, Game, UserAccount } from "../../api";
import GameSection from "./components/GameSection";

interface HomePageProps {
    user: UserAccount | null;
}

const gameSectionTitleStyles = `text-textColor font-ssp font-normal tracking-wide
                                text-3xl uppercase mt-16 text-center md:text-left`;

const HomePage: React.FC<HomePageProps> = ({ user }) => {

    const { data: games, 
            error: gameLoadError, 
            isLoading: gamesAreLoading 
    } = useQuery<Game[]>({
        queryKey: ['games'],
        queryFn: fetchGames,
    });

    return (
        <main className="px-4 sm:px-8 py-24 md:py-32">
            <div className="sm:px-2 md:px-16 xl:px-28">
                <h1 className="font-ssp font-bold text-7xl md:text-8xl lg:text-[7rem] text-textColor
                            text-center md:text-left">PlayRates</h1>
                <h2 className="font-ssp font-semibold text-2xl lg:text-3xl text-[#cacaca]
                            ml-1 mt-3 md:mt-5 text-center md:text-left">All of your games in one place...</h2>

                {/* Signup / login wrapper */}

                {/* in the future, this will be rendered depending if the user has an
                    account or not, currently just shows for building purposes */}
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
            </div>

            {/* Trending games */}
            <h2 className={gameSectionTitleStyles}>Trending Games</h2>
            <GameSection games={games} loading={gamesAreLoading} error={gameLoadError}/>
            
        </main>
    );
}

export default HomePage;