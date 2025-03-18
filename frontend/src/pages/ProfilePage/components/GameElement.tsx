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
            <div className="game-cover w-1/3 p-1 sm:w-1/4 md:w-[14%] xl:w-[11%]">
                <img
                    className="h-full w-full rounded-md object-cover"
                    src={`/PlayRates/assets/game-covers/${game.id}.png`}
                />
            </div>
        );
    }
};

export default GameElement;
