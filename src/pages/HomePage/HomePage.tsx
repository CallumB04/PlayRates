import { Link } from "react-router-dom";

function HomePage() {

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
                            gap-3 items-center mt-12 md:mt-16">
                <Link to="/signup" className="px-6 py-4 md:px-4 md:py-[10px] bg-highlightPurple text-textColor
                                              text-4xl md:text-2xl font-semibold
                                   hover:text-[#0e0e0e] active:transform active:-translate-y-[2px]
                                   transition-all duration-300 rounded-md">
                    Sign up
                </Link>
                <p className="text-textColor font-light text-xl">
                    or  <Link to="/login" className="underline hover:text-highlightPurple">log in</Link> if you have an account
                </p>
            </div>
        </main>
    );
}

export default HomePage;