import { Game } from "../../../api";

interface GameElementProps {
    game: Game;
}

const GameElement: React.FC<GameElementProps> = ({ game }) => {

    return (
        <div key={game.id} 
            className="w-[170px] md:w-[200px] 2xl:w-[230px] h-72 bg-red-500 rounded-md">
            {game.title}
        </div>
    )
};

export default GameElement;