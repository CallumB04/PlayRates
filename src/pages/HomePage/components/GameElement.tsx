import { useState } from "react";
import { Game } from "../../../api";
import { Link } from "react-router-dom";
import { useUser } from "../../../App";

interface GameElementProps {
    game: Game;
}

const GameElement: React.FC<GameElementProps> = ({ game }) => {
    const [imgLoaded, setImgLoaded] = useState(true);
    const user = useUser();

    return (
        <Link
            to={`/game/${game.id}`}
            key={game.id}
            className="group relative flex aspect-[3/4] w-[31%] items-center justify-center rounded-md bg-[#0e0e0e] font-lexend md:w-[15%]"
        >
            {/* Text displayed if image can't be loaded */}
            <p
                className={`whitespace-normal break-words text-center text-base font-semibold text-text-primary group-hover:z-20 sm:text-xl md:text-base lg:text-xl 2xl:text-3xl ${imgLoaded ? "opacity-0" : "opacity-100"} px-2 transition-opacity duration-300 group-hover:opacity-100`}
            >
                {game.title}
            </p>
            <img
                className="absolute left-0 top-0 h-full w-full rounded-md object-cover transition-opacity duration-300 group-hover:opacity-10"
                src={`./PlayRates/assets/game-covers/${game.id}.png`}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                    setImgLoaded(false);
                }}
            />
            {/* Quick add button - Plus sign 
                Currently no functionality, will allow users to add games
                to their account from the home page. */}
            {user ? (
                <i className="fa-solid fa-plus absolute bottom-[4%] mx-auto hidden h-[13%] w-1/3 items-center justify-center rounded-md bg-[#ffffff22] text-lg text-text-primary opacity-0 transition-all duration-300 hover:bg-[#ffffff33] group-hover:opacity-100 sm:flex md:text-sm lg:text-lg xl:text-xl 2xl:h-[11%] 2xl:w-[30%] 2xl:text-2xl"></i>
            ) : (
                <></>
            )}
        </Link>
    );
};

export default GameElement;
