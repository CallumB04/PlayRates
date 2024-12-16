import { Link } from "react-router-dom";
import { Game } from '../../App';
import { useEffect } from "react";

// Defining type of props
interface HomePageProps {
  gamesData: Game[] | null;
}

const HomePage: React.FC<HomePageProps> = ({ gamesData }) => {

    useEffect(() => {
        console.log(gamesData);
    }, [gamesData])

    return (
        <main className="px-4 sm:px-10 md:px-16 xl:px-28 pt-24 md:pt-32">
            <h1 className="font-ssp font-bold text-7xl md:text-8xl lg:text-[7rem] text-textColor
                           text-center md:text-left">PlayRates</h1>
            <h2 className="font-ssp font-semibold text-2xl lg:text-3xl text-[#cacaca]
                           ml-1 mt-3 md:mt-5 text-center md:text-left">All of your games in one place...</h2>

            {/* Signup / login wrapper */}

            {/* in the future, this will be rendered depending if the user has an
                account or not, currently just shows for building purposes */}
            <div className="w-full mx-auto flex flex-col md:flex-row justify-center md:justify-start 
                            gap-5 md:gap-3 items-center mt-12 md:mt-16">
                <Link to="/signup" className="px-6 py-4 md:px-5 md:py-3 bg-highlightPurple text-textColor
                                              text-4xl md:text-3xl font-semibold
                                            hover:bg-purple-500 active:transform active:-translate-y-[2px]
                                              transition-transform duration-200 rounded-lg">
                    Sign up
                </Link>
                <p className="text-textColor font-light text-xl">
                    or  <Link to="/login" className="underline hover:text-highlightPurple">
                    log in</Link> if you have an account
                </p>
            </div>

            {/* Trending games */}
            <div className="">

            </div>
        </main>
    );
}

export default HomePage;