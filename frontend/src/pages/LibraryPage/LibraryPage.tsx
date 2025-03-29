import { useQuery } from "@tanstack/react-query";
import { fetchGameLogsByUserID, fetchGames, Game, GameLog } from "../../api";
import { useUser } from "../../App";
import GameElement from "./components/GameElement";

const LibraryPage = () => {
    const currentUser = useUser();

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
        error: currentUserGameLogsError,
        isLoading: currentUserGameLogsLoading,
    } = useQuery<GameLog[] | undefined>({
        queryKey: ["currentUserGameLogs", currentUser?.id],
        queryFn: () => fetchGameLogsByUserID(currentUser!.id),
        enabled: !!currentUser,
    });

    return (
        <section className="flex w-full gap-4">
            {/* Filters Menu (for larger screens) */}
            <aside className="card hidden h-[85vh] w-80 lg:flex">
                <h2 className="card-header-text">Filters</h2>
            </aside>
            {/* Games */}
            <div className="flex h-max w-full flex-wrap gap-1">
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
                            handleView={() => {}}
                            handleEdit={() => {}}
                            handleCreate={() => {}}
                            popupIsVisible={false}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default LibraryPage;
