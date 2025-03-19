import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";
import { Link } from "react-router-dom";

interface GameElementProps {
    gameLog: GameLog;
    isMyAccount: boolean;
}

const GameElement: React.FC<GameElementProps> = ({ gameLog, isMyAccount }) => {
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [hoveringIcon, setHoveringIcon] = useState<boolean>(false);
    const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);

    useEffect(() => {});

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
            <Link
                to={`/game/${game.id}`}
                className="game-cover group relative w-1/3 p-1 sm:w-1/4 md:w-[14%] xl:w-[11%]"
            >
                <img
                    className="h-full w-full rounded-md object-cover"
                    src={`/PlayRates/assets/game-covers/${game.id}.png`}
                />
                <div className="absolute left-0 top-0 h-full w-full p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-md transition-colors duration-200 group-hover:bg-[#0e0e0ebb]">
                        <p className="relative line-clamp-3 break-words px-1 text-center font-lexend text-lg text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-base lg:text-sm 2xl:text-base">
                            {game.title}
                        </p>
                        {/* Ellipsis icon, hover to reveal menu */}
                        <i
                            className="fas fa-ellipsis absolute right-0 top-0 pr-3 pt-1 text-lg text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            onMouseOver={() => setHoveringIcon(true)}
                            onMouseOut={() => setHoveringIcon(false)}
                        ></i>
                        {hoveringIcon || hoveringMenu ? (
                            <div
                                className="absolute -right-24 top-2 z-50 h-1/2 w-full rounded bg-navbar text-center font-lexend text-sm text-text-primary"
                                onMouseOver={() => setHoveringMenu(true)}
                                onMouseOut={() => setHoveringMenu(false)}
                            >
                                <span className="flex h-1/2 w-full items-center justify-center gap-2 rounded-t border-b-[1px] border-b-[#cacaca44] transition-colors duration-200 hover:text-highlight-primary">
                                    <p>View</p>
                                    <i className="fas fa-eye"></i>
                                </span>
                                <span className="flex h-1/2 w-full items-center justify-center gap-2 rounded-b transition-colors duration-200 hover:text-highlight-primary">
                                    <p>{isMyAccount ? "Edit" : "Add"}</p>
                                    <i
                                        className={`fas ${isMyAccount ? "fa-pen-to-square" : "fa-add"}`}
                                    ></i>
                                </span>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </Link>
        );
    }
};

export default GameElement;
