import { Game } from "../../../api";
import GameElement from "./GameElement.tsx";


interface GameSectionProps {
    games: Game[] | undefined;
    loading: boolean;
    error: Error | null;
}

const GameSection: React.FC<GameSectionProps> = ({ games, loading, error }) => {

    // displaying error / loading message when games aren't fetched
    if (error) { return <p>Error Loading Games...</p>}
    if (loading) { return <p>Loading Games...</p>}

    return (
        <div className="mt-4 w-full mx-auto md:9/12 flex justify-evenly gap-x-2 md:gap-x-4 gap-y-5 flex-wrap">
            {/* Mapping over and display games in array */}
            { games?.map(game => <GameElement game={game} />) }
        </div>
    )
};

export default GameSection;