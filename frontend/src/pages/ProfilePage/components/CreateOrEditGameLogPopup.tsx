import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";
import ClosePopupIcon from "../../../components/ClosePopupIcon";

const capitalise = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`;

interface CreateOrEditGameLogPopupProps {
    closePopup: () => void;
    gamelog?: GameLog | null; // associated game log (if editing)
    gameID?: number; // if creating, allows for fetching of game
    editing: boolean; // true: editing, false: creating new
}

const CreateOrEditGameLogPopup: React.FC<CreateOrEditGameLogPopupProps> = ({
    closePopup,
    gamelog,
    editing,
    gameID,
}) => {
    const [game, setGame] = useState<Game | undefined>(undefined);

    // Input values
    const [statusInput, setStatusInput] = useState<string>(
        gamelog?.status || "played"
    );
    const [platformInput, setPlatformInput] = useState<string>(
        gamelog?.platform || "steam"
    );
    const [startDateInput, setStartDateInput] = useState<string>(
        gamelog?.startDate || ""
    );
    const [finishDateInput, setFinishDateInput] = useState<string>(
        gamelog?.finishDate || ""
    );
    const [completeAchievementsInput, setCompleteAchievmentsInput] =
        useState<string>(gamelog?.achievementsCompleted?.toString() || "");
    const [totalAchievementsInput, setTotalAchievmentsInput] = useState<string>(
        gamelog?.achievementsTotal?.toString() || ""
    );
    const [hoursPlayedInput, setHoursPlayedInput] = useState<string>(
        gamelog?.hoursPlayed?.toString() || ""
    );
    const [hoursToBeatInput, setHoursToBeatInput] = useState<string>(
        gamelog?.hoursToBeat?.toString() || ""
    );
    const [ratingInput, setRatingInput] = useState<string>(
        gamelog?.rating?.toString() || "1"
    );

    // fetch game data from ID in game log, and set state when fetched
    useEffect(() => {
        const fetchGameFromLog = async () => {
            const gameIdToFetch = gamelog ? gamelog.id : gameID!;
            const fetchedGame = await fetchGameById(gameIdToFetch);

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
                    {editing ? "Edit" : "Create New"} Log
                </h2>

                <div className="relative flex w-full flex-col gap-4">
                    <h3 className="max-w-[calc(100%-72px)] text-left text-2xl text-text-primary sm:max-w-full">
                        {game?.title}
                        <span className="ml-2.5 text-xl font-light text-text-secondary">
                            {game?.releaseDate.slice(0, 4)}
                        </span>
                    </h3>

                    <div className="flex w-full">
                        <div className="absolute right-0 top-0 flex min-h-40 w-16 max-w-[30%] flex-col gap-2 sm:relative sm:w-max">
                            <img
                                className="w-full rounded-md object-cover"
                                src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                            />
                        </div>
                        <div className="flex flex-grow flex-col gap-3 sm:px-4">
                            <span className="flex gap-3">
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <p className="text-xs font-semibold text-text-primary">
                                        Status
                                    </p>
                                    <select
                                        className="dropdown-input h-9"
                                        defaultValue={statusInput}
                                        onChange={(e) =>
                                            setStatusInput(
                                                e.currentTarget.value
                                            )
                                        }
                                    >
                                        <option value="played">Played</option>
                                        <option value="playing">Playing</option>
                                        <option value="backlog">Backlog</option>
                                        <option value="wishlist">
                                            Wishlist
                                        </option>
                                    </select>
                                </div>
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <span className="flex gap-1.5">
                                        <p className="text-xs font-semibold text-text-primary">
                                            Platform
                                        </p>
                                        <i
                                            className={`fab fa-${platformInput} text-xs text-text-primary`}
                                        ></i>
                                    </span>
                                    <select
                                        className="dropdown-input h-9"
                                        defaultValue={platformInput}
                                        onChange={(e) =>
                                            setPlatformInput(
                                                e.currentTarget.value
                                            )
                                        }
                                    >
                                        {/* TODO: Add more platforms */}
                                        <option value="steam">Steam</option>
                                        <option value="xbox">Xbox</option>
                                    </select>
                                </div>
                            </span>
                            <span className="flex gap-3">
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <p className="text-xs font-semibold text-text-primary">
                                        Start
                                    </p>

                                    <input
                                        type="date"
                                        className="date-input h-9"
                                        defaultValue={startDateInput}
                                        onChange={(e) =>
                                            setStartDateInput(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <p className="text-xs font-semibold text-text-primary">
                                        Finish
                                    </p>

                                    <input
                                        type="date"
                                        className="date-input h-9"
                                        defaultValue={finishDateInput}
                                        onChange={(e) =>
                                            setFinishDateInput(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span className="flex gap-3">
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <span className="flex gap-1.5">
                                        <p className="text-xs font-semibold text-text-primary">
                                            Achievements
                                        </p>
                                        <i className="fas fa-trophy text-xs text-yellow-300"></i>
                                    </span>

                                    <span className="flex gap-1">
                                        <input
                                            type="text"
                                            className="text-input w-11"
                                            defaultValue={
                                                completeAchievementsInput
                                            }
                                            placeholder="0"
                                            onChange={(e) =>
                                                setCompleteAchievmentsInput(
                                                    e.currentTarget.value
                                                        .toString()
                                                        .replace(/[^0-9.]/g, "")
                                                )
                                            }
                                        />
                                        <p className="text-2xl font-extralight text-text-primary">
                                            /
                                        </p>
                                        <input
                                            type="text"
                                            className="text-input w-11"
                                            defaultValue={
                                                totalAchievementsInput
                                            }
                                            placeholder="123"
                                            onChange={(e) =>
                                                setTotalAchievmentsInput(
                                                    e.currentTarget.value
                                                        .toString()
                                                        .replace(/[^0-9.]/g, "")
                                                )
                                            }
                                        />
                                    </span>
                                </div>
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <p className="text-xs font-semibold text-text-primary">
                                        Hours Played
                                    </p>

                                    <input
                                        type="text"
                                        className="text-input w-24"
                                        defaultValue={hoursPlayedInput}
                                        placeholder="0"
                                        onChange={(e) =>
                                            setHoursPlayedInput(
                                                e.currentTarget.value
                                                    .toString()
                                                    .replace(/[^0-9.]/g, "")
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex h-max flex-col items-start gap-0.5">
                                    <p className="text-xs font-semibold text-text-primary">
                                        Hours To Beat
                                    </p>

                                    <input
                                        type="text"
                                        className="text-input w-24"
                                        defaultValue={hoursToBeatInput}
                                        placeholder="0"
                                        onChange={(e) =>
                                            setHoursToBeatInput(
                                                e.currentTarget.value
                                                    .toString()
                                                    .replace(/[^0-9.]/g, "")
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="flex justify-between text-xs font-semibold text-text-primary">
                                        <p>1</p>
                                        <p className="w-[86px] text-left">
                                            Rating ( {ratingInput} )
                                        </p>
                                        <p>10</p>
                                    </span>
                                    <input
                                        type="range"
                                        className="range-input w-full"
                                        max="10"
                                        min="1"
                                        step="0.25"
                                        defaultValue={ratingInput}
                                        onChange={(e) =>
                                            setRatingInput(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col justify-center gap-5 sm:flex-row">
                    <button className="button-primary w-full sm:w-1/2">
                        {editing ? "Save" : "Create"}
                    </button>
                    <button
                        className="button-outline button-outline-default w-full sm:w-1/2"
                        onClick={closePopup}
                    >
                        Cancel
                    </button>
                </div>

                <ClosePopupIcon onClick={closePopup} />
            </div>
        </dialog>
    );
};

export default CreateOrEditGameLogPopup;
