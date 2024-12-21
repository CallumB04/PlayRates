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
            className="w-[170px] md:w-[200px] 2xl:w-[220px] h-60 md:h-72 bg-[#0e0e0e] rounded-md relative
                       flex justify-center items-center group">
            {/* Text displayed if image can't be loaded */}
            <p className={`text-center text-xl text-textColor break-words whitespace-normal
                          group-hover:z-20 font-semibold
                          ${imgLoaded ? "opacity-0" : "opacity-100"} group-hover:opacity-100 
                          transition-opacity duration-300`}>
                {game.title}
            </p>
            <img className="absolute top-0 left-0 object-cover w-full h-full rounded-md
                            group-hover:opacity-10 transition-opacity duration-300"
                 src={`./PlayRates/assets/game-covers/${game.id}.png`} 
                 onError={(e) => {e.currentTarget.style.display = "none"; setImgLoaded(false)}}/>
            {/* Quick add button - Plus sign 
                Currently no functionality, will allow users to add games
                to their account from the home page. */}
            <i className="fa-solid fa-plus text-textColor absolute bottom-3 mx-auto px-5
                          pb-[1px] bg-[#ffffff22] rounded-md text-xl opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 hover:bg-[#ffffff33]"></i>
        </Link>
    )
};

export default GameElement;