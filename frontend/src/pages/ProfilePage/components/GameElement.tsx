import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";
import { Link } from "react-router-dom";

interface GameElementProps {
    gameLog: GameLog;
    isMyAccount: boolean;
    currentUserSharesLog: boolean; // if current user also has a log of this game
    handleView: () => void;
    handleEdit: () => void;
    handleCreate: () => void;
    handleRedirectAndView: () => void;
    popupIsVisible: boolean;
}

const GameElement: React.FC<GameElementProps> = ({
    gameLog,
    isMyAccount,
    currentUserSharesLog,
    handleView,
    handleEdit,
    handleCreate,
    handleRedirectAndView,
    popupIsVisible,
}) => {
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [hoveringIcon, setHoveringIcon] = useState<boolean>(false);
    const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);

    useEffect(() => {
        if (popupIsVisible) {
            setHoveringIcon(false);
            setHoveringMenu(false);
        }
    }, [popupIsVisible]);

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
                    {/* Hover menu (lg screens and above) */}
                    <div className="hidden h-full w-full items-center justify-center rounded-md transition-colors duration-200 group-hover:bg-[#0e0e0ebb] lg:flex">
                        <p className="relative line-clamp-3 break-words px-1 text-center font-lexend text-lg text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-base lg:text-sm 2xl:text-base">
                            {game.title}
                        </p>
                        {/* Ellipsis icon, hover to reveal menu */}
                        <i
                            className="fas fa-ellipsis absolute right-0 top-0 pl-2 pr-3 pt-1 text-lg text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            onMouseOver={() => setHoveringIcon(true)}
                            onMouseOut={() => setHoveringIcon(false)}
                        ></i>
                        {(hoveringIcon || hoveringMenu) && !popupIsVisible ? (
                            <div
                                className="hover-menu fade-in-left absolute right-8 top-2 h-1/2 min-h-16 w-full min-w-24 text-center text-sm"
                                onMouseOver={() => setHoveringMenu(true)}
                                onMouseOut={() => setHoveringMenu(false)}
                            >
                                <span
                                    className="flex h-1/2 w-full items-center justify-center gap-2 rounded-t border-b-[1px] border-b-[#cacaca44] transition-colors duration-200 hover:text-highlight-primary"
                                    onClick={(e) => {
                                        e.preventDefault(); // prevent Link from triggering
                                        handleView();
                                    }}
                                >
                                    <p>View</p>
                                    <i className="fas fa-eye"></i>
                                </span>
                                <span
                                    className="flex h-1/2 w-full items-center justify-center gap-2 rounded-b transition-colors duration-200 hover:text-highlight-primary"
                                    onClick={(e) => {
                                        e.preventDefault(); // prevent Link from triggering
                                        !currentUserSharesLog
                                            ? isMyAccount
                                                ? handleEdit()
                                                : handleCreate()
                                            : handleRedirectAndView();
                                    }}
                                >
                                    <p>
                                        {!currentUserSharesLog
                                            ? isMyAccount
                                                ? "Edit"
                                                : "Add"
                                            : "My Log"}
                                    </p>
                                    <i
                                        className={`fas ${!currentUserSharesLog ? (isMyAccount ? "fa-pen-to-square" : "fa-add") : "fa-user"}`}
                                    ></i>
                                </span>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* icon menu bar for smaller devices */}
                    <div className="flex h-full w-full items-end justify-center p-1.5 lg:hidden">
                        <span className="flex h-1/5 w-2/3 rounded bg-[#2e2e2edd]">
                            <span
                                className="flex h-full w-1/2 items-center justify-center text-text-secondary hover:text-highlight-primary"
                                onClick={(e) => {
                                    e.preventDefault(); // prevent Link from triggering
                                    handleView();
                                }}
                            >
                                <i className="fas fa-eye" title="View"></i>
                            </span>
                            <span
                                className="flex h-full w-1/2 items-center justify-center text-text-secondary hover:text-highlight-primary"
                                onClick={(e) => {
                                    e.preventDefault(); // prevent Link from triggering
                                    !currentUserSharesLog
                                        ? isMyAccount
                                            ? handleEdit()
                                            : handleCreate()
                                        : handleRedirectAndView();
                                }}
                            >
                                <i
                                    className={`fas ${!currentUserSharesLog ? (isMyAccount ? "fa-pen-to-square" : "fa-add") : "fa-user"}`}
                                    title={
                                        !currentUserSharesLog
                                            ? isMyAccount
                                                ? "Edit"
                                                : "Add"
                                            : "My Log"
                                    }
                                ></i>
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
        );
    }
};

export default GameElement;
