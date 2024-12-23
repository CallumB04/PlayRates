import { useState } from "react";
import { Game } from "../../../api";
import { Link } from "react-router-dom";

interface GameElementProps {
    game: Game;
}

const GameElement: React.FC<GameElementProps> = ({ game }) => {

    const [imgLoaded, setImgLoaded] = useState(true);

    return (
        <Link to={`/game/${game.id}`} key={game.id} 
            className="w-[31%] md:w-[15%] aspect-[3/4] 
                     bg-[#0e0e0e] rounded-md relative flex justify-center items-center group">
            {/* Text displayed if image can't be loaded */}
            <p className={`text-center text-base sm:text-xl md:text-base lg:text-xl text-textColor 
                          break-words whitespace-normal group-hover:z-20 font-semibold
                          ${imgLoaded ? "opacity-0" : "opacity-100"} group-hover:opacity-100 
                          transition-opacity duration-300 px-1`}>
                {game.title}
            </p>
            <img className="absolute top-0 left-0 object-cover w-full h-full rounded-md
                            group-hover:opacity-10 transition-opacity duration-300"
                 src={`./PlayRates/assets/game-covers/${game.id}.png`} 
                 onError={(e) => {e.currentTarget.style.display = "none"; setImgLoaded(false)}}/>
            {/* Quick add button - Plus sign 
                Currently no functionality, will allow users to add games
                to their account from the home page. */}
            <i className="fa-solid fa-plus text-textColor absolute bottom-3 mx-auto w-1/3 h-[14%]
                          bg-[#ffffff22] rounded-md hidden sm:flex text-lg md:text-sm lg:text-lg xl:text-xl opacity-0 
                          group-hover:opacity-100 transition-all duration-300 hover:bg-[#ffffff33] justify-center
                          items-center"></i>
        </Link>
    )
};

export default GameElement;