import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";
import ClosePopupIcon from "../../../components/ClosePopupIcon";
import { getColorFromGameStatus } from "../../../App";

interface ViewGameLogPopupProps {
    closePopup: () => void;
    isMyAccount: boolean;
    gamelog: GameLog | null;
}

const ViewGameLogPopup: React.FC<ViewGameLogPopupProps> = ({
    closePopup,
    isMyAccount,
    gamelog,
}) => {
    const [game, setGame] = useState<Game | undefined>(undefined);

    // fetch game data from ID in game log, and set state when fetched
    useEffect(() => {
        const fetchGameFromLog = async () => {
            const fetchedGame = await fetchGameById(gamelog!.id);

            if (fetchedGame) {
                setGame(fetchedGame);
            }
        };

        fetchGameFromLog();
    }, []);

    return (
        <dialog className="popup-backdrop" onMouseDown={closePopup}>
            <div
                className="popup popup-default flex w-[600px] flex-col gap-6 text-center"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <h2 className="border-b-[1px] border-b-[#cacaca55] pb-3 text-xl text-text-primary">
                    View Log
                </h2>

                <div className="flex w-full flex-col gap-4">
                    <span className="flex w-full items-end gap-3">
                        <h3 className="text-left text-2xl text-text-primary">
                            {game?.title}
                        </h3>
                        <p className="text-xl font-light text-text-secondary">
                            {game?.releaseDate.slice(0, 4)}
                        </p>
                    </span>
                    <div className="flex w-full">
                        <div className="flex min-h-40 max-w-[30%] flex-col gap-2">
                            <img
                                className="w-full rounded-md object-cover"
                                src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                            />
                        </div>
                        <div className="flex flex-grow justify-between">
                            <div className="flex flex-col gap-1 pl-4 text-left">
                                <p className="text-text-primary">
                                    Status:{" "}
                                    <span
                                        className={`font-light ${getColorFromGameStatus(gamelog!.status)?.bg} ${getColorFromGameStatus(gamelog!.status)?.text} rounded-full px-1.5 py-0.5`}
                                    >
                                        {gamelog?.status[0].toUpperCase()}
                                        {gamelog?.status.slice(1)}
                                    </span>
                                </p>
                                {gamelog?.platform ? (
                                    <p className="text-text-primary">
                                        Platform:{" "}
                                        <span className="font-extralight">
                                            {gamelog.platform}
                                            {/* TODO: ADD LOGO instead of / next to text */}
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                                {gamelog?.startDate ? (
                                    <p className="text-text-primary">
                                        Started:{" "}
                                        <span className="font-extralight">
                                            {gamelog.startDate}
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                                {gamelog?.startDate ? (
                                    <p className="text-text-primary">
                                        Finished:{" "}
                                        <span className="font-extralight">
                                            {gamelog.finishDate || "N/A"}
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                                {gamelog?.hoursPlayed ? (
                                    <p className="text-text-primary">
                                        Time Played:{" "}
                                        <span className="font-extralight">
                                            {gamelog.hoursPlayed}
                                            <span className="text-sm">
                                                {" "}
                                                hours
                                            </span>
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                                {gamelog?.hoursToBeat ? (
                                    <p className="text-text-primary">
                                        Completed in:{" "}
                                        <span className="font-extralight">
                                            {gamelog.hoursToBeat}
                                            <span className="text-sm">
                                                {" "}
                                                hours
                                            </span>
                                        </span>
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 pr-4">
                                <span className="flex items-center justify-start gap-2 text-lg">
                                    <i className="fas fa-trophy text-yellow-300"></i>
                                    <p className="font-extralight text-text-primary">
                                        {gamelog?.achievementsCompleted || 0}/
                                        {gamelog?.achievementsTotal || "?"}
                                    </p>
                                </span>
                                <span className="flex items-center justify-start gap-2 text-lg">
                                    <i className="fas fa-star text-highlight-hover"></i>
                                    <p className="font-extralight text-text-primary">
                                        {gamelog?.rating || "?"}/10
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col justify-center gap-5 sm:flex-row">
                    <button className="button-secondary w-full sm:w-1/2">
                        Edit
                    </button>
                    <button
                        className="button-outline button-outline-default w-full sm:w-1/2"
                        onClick={closePopup}
                    >
                        Close
                    </button>
                </div>

                <ClosePopupIcon onClick={closePopup} />
            </div>
        </dialog>
    );
};

export default ViewGameLogPopup;
