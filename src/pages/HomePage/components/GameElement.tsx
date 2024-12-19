import { Game } from "../../../api";

interface GameElementProps {
    game: Game;
}

const GameElement: React.FC<GameElementProps> = ({ game }) => {

    return (
        <div key={game.id} 
            className="w-[170px] md:w-[200px] 2xl:w-[220px] h-60 md:h-72 bg-[#0e0e0e] rounded-md relative
                       flex justify-center items-center">
            {/* Text displayed if image can't be loaded */}
            <p className="text-center text-lg text-textColor break-words whitespace-normal">
                {game.title}
            </p>
            <img className = "absolute top-0 left-0 object-cover w-full h-full rounded-md"
                 src={`./PlayRates/assets/game-covers/${game.id}.png`} 
                 onError={(e) => e.currentTarget.style.display = "none"}/>
        </div>
    )
};

export default GameElement;