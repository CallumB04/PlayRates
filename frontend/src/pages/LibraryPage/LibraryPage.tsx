import { useQuery } from "@tanstack/react-query";
import { fetchGameLogsByUserID, fetchGames, Game, GameLog } from "../../api";
import { useUser } from "../../App";
import GameElement from "./components/GameElement";
import { useState } from "react";
import ViewGameLogPopup from "../../components/ViewGameLogPopup";
import CreateOrEditGameLogPopup from "../../components/CreateOrEditGameLogPopup";
import LoadingSpinner from "../../components/LoadingSpinner";

interface LibraryPageProps {
    runNotification: (
        text: string,
        type: "success" | "error" | "pending"
    ) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ runNotification }) => {
    const currentUser = useUser();

    // game log popup visiblilities
    const [viewGameLogPopupVisible, setViewGameLogPopupVisible] =
        useState<boolean>(false);
    const [editGameLogPopupVisible, setEditGameLogPopupVisible] =
        useState<boolean>(false);
    const [createGameLogPopupVisible, setCreateGameLogPopupVisible] =
        useState<boolean>(false);
    const [currentVisibleGameLog, setCurrentVisibleGameLog] =
        useState<GameLog | null>(null);
    const [currentVisibleGameID, setCurrentVisibleGameID] = useState<number>(0); // for create popup

    // fetching all games from API
    const {
        data: games,
        error: gamesError,
        isLoading: gamesLoading,
    } = useQuery<Game[] | undefined>({
        queryKey: ["games"],
        queryFn: () => fetchGames(),
    });

    // fetching current users game logs from API, if logged in
    const {
        data: currentUserGameLogs,
        refetch: refetchCurrentUserGameLogs,
        error: currentUserGameLogsError,
        isLoading: currentUserGameLogsLoading,
    } = useQuery<GameLog[] | undefined>({
        queryKey: ["currentUserGameLogs", currentUser?.id],
        queryFn: () => fetchGameLogsByUserID(currentUser!.id),
        enabled: !!currentUser,
    });

    // function ran after successful edit or creation of a log
    const viewUpdatedLog = (log: GameLog) => {
        refetchCurrentUserGameLogs();
        setCurrentVisibleGameLog(log);
        setViewGameLogPopupVisible(true);
    };

    return (
        <section className="flex w-full gap-4">
            {/* Filters Menu (for larger screens) */}
            <aside className="card hidden h-[85vh] w-80 lg:flex">
                <h2 className="card-header-text">Filters</h2>
            </aside>
            {/* Games */}
            {gamesLoading || currentUserGameLogsLoading ? (
                <span className="mx-auto flex h-[85vh] w-max flex-row items-center justify-center gap-6">
                    <LoadingSpinner size={8} />
                    <p className="font-lexend text-xl tracking-wide text-text-primary">
                        Loading Games...
                    </p>
                </span>
            ) : (
                <div className="mx-auto flex h-max w-full flex-wrap justify-center gap-1">
                    {games?.map((game) => {
                        return (
                            <GameElement
                                key={game.id}
                                game={game}
                                userLoggedIn={currentUser ? true : false}
                                userHasLog={
                                    currentUserGameLogs?.some(
                                        (log) => log.id === game.id
                                    )
                                        ? true
                                        : false
                                }
                                handleView={() => {
                                    setCurrentVisibleGameLog(
                                        currentUserGameLogs?.find(
                                            (log) => log.id === game.id
                                        )!
                                    );
                                    setViewGameLogPopupVisible(true);
                                }}
                                handleEdit={() => {
                                    setCurrentVisibleGameLog(
                                        currentUserGameLogs?.find(
                                            (log) => log.id === game.id
                                        )!
                                    );
                                    setEditGameLogPopupVisible(true);
                                }}
                                handleCreate={() => {
                                    setCurrentVisibleGameID(game.id);
                                    setCreateGameLogPopupVisible(true);
                                }}
                                popupIsVisible={false}
                            />
                        );
                    })}
                </div>
            )}
            {viewGameLogPopupVisible ? (
                <ViewGameLogPopup
                    closePopup={() => setViewGameLogPopupVisible(false)}
                    isMyAccount={true}
                    userLoggedIn={currentUser ? true : false}
                    gamelog={currentVisibleGameLog}
                    openEdit={() => setEditGameLogPopupVisible(true)}
                    openCreate={() => setCreateGameLogPopupVisible(true)}
                    currentUserSharesLog={true}
                    redirectAndOpenView={() => {}}
                    libraryPage={true}
                />
            ) : (
                <></>
            )}
            {createGameLogPopupVisible ? (
                <CreateOrEditGameLogPopup
                    closePopup={() => setCreateGameLogPopupVisible(false)}
                    editing={false}
                    gameID={currentVisibleGameID}
                    userID={currentUser!.id}
                    runNotification={runNotification}
                    viewUpdatedLog={viewUpdatedLog}
                />
            ) : (
                <></>
            )}
            {editGameLogPopupVisible ? (
                <CreateOrEditGameLogPopup
                    closePopup={() => setEditGameLogPopupVisible(false)}
                    gamelog={currentVisibleGameLog}
                    editing={true}
                    userID={currentUser!.id}
                    runNotification={runNotification}
                    viewUpdatedLog={viewUpdatedLog}
                />
            ) : (
                <></>
            )}
        </section>
    );
};

export default LibraryPage;
