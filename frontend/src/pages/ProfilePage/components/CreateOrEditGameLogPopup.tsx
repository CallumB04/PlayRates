import { useEffect, useState } from "react";
import { fetchGameById, Game, GameLog } from "../../../api";
import ClosePopupIcon from "../../../components/ClosePopupIcon";
import { getColorFromGameStatus } from "../../../App";

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
                    {editing ? "Edit" : "Create new"} Log
                </h2>

                <div className="flex w-full flex-col gap-4">
                    <h3 className="text-left text-2xl text-text-primary">
                        {game?.title}
                        <span className="ml-2.5 text-xl font-light text-text-secondary">
                            {game?.releaseDate.slice(0, 4)}
                        </span>
                    </h3>

                    <div className="flex w-full">
                        <div className="flex min-h-40 max-w-[30%] flex-col gap-2">
                            <img
                                className="w-full rounded-md object-cover"
                                src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                            />
                        </div>
                        <div className="flex flex-grow"></div>
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
