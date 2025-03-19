import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";

interface GameElementProps {
    gameLog: GameLog;
}

const GameElement: React.FC<GameElementProps> = ({ gameLog }) => {
    const [game, setGame] = useState<Game | undefined>(undefined);

    // fetch game data from ID in game log, and set state when fetched
    useEffect(() => {
        const fetchGameFromLog = async () => {
            const fetchedGame = await fetchGameById(gameLog.id);

            if (fetchedGame) {
                setGame(fetchedGame);
            }
        };

        fetchGameFromLog();
    }, []);

    if (game) {
        return (
            <div className="game-cover group relative w-1/3 p-1 sm:w-1/4 md:w-[14%] xl:w-[11%]">
                <img
                    className="h-full w-full rounded-md object-cover"
                    src={`/PlayRates/assets/game-covers/${game.id}.png`}
                />
                <div className="absolute left-0 top-0 h-full w-full p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-md transition-colors duration-200 group-hover:bg-[#0e0e0eaa]">
                        <p className="line-clamp-3 break-words px-1 text-center font-lexend text-lg text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-base lg:text-sm 2xl:text-base">
                            {game.title}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default GameElement;
