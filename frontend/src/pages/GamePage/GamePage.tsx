import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById, fetchGameLogs, Game, GameLog } from "../../api";
import { gamePlatforms } from "../../App";
import { useQuery } from "@tanstack/react-query";

const GamePage = () => {
    const { gameID } = useParams(); // getting game id from URL
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [gameLogs, setGameLogs] = useState<GameLog[] | undefined>(undefined);

    // fetching gamelogs from API
    const {
        data: overallGameLogs,
        error: overallGameLogsError,
        isLoading: overallGameLogsLoading,
    } = useQuery<{ [userID: string]: GameLog[] }>({
        queryKey: ["gamelogs"],
        queryFn: fetchGameLogs,
    });

    useEffect(() => {
        const loadGameByID = async () => {
            // fetching game with given ID
            const fetchedGame = await fetchGameById(Number(gameID));

            // sets game in state when fetched
            if (fetchedGame) {
                setGame(fetchedGame);
            }
        };

        loadGameByID();
    }, []);

    useEffect(() => {
        if (overallGameLogs && game) {
            // flattens all nested logs into a singular array of game logs
            // then filters game based on which matches the current game
            const matchingGameLogs = Object.values(overallGameLogs)
                .flatMap((logs) => logs)
                .filter((log) => log.id === game?.id);
            setGameLogs(matchingGameLogs);
        }
    }, [overallGameLogs, game]);

    return (
        <section className="mx-auto mt-20 min-w-[1200px] max-w-[1200px] font-lexend">
            <span className="flex gap-8">
                {/* Left column */}
                <div className="flex w-full flex-col gap-3">
                    <img
                        src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                        className="h-80 max-w-max rounded-md"
                    />
                    <div className="flex w-full flex-col gap-2">
                        <span className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-text-secondary px-2.5 py-1 text-text-primary">
                            <p>
                                {gameLogs?.length}{" "}
                                {gameLogs?.length === 1 ? "Log" : "Logs"}
                            </p>
                            <i className="fa-solid fa-chart-bar"></i>
                        </span>
                        <span className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-text-secondary px-2.5 py-1 text-text-primary">
                            {gameLogs &&
                            gameLogs.filter((log) => log.rating).length >= 1 ? (
                                <p>
                                    {gameLogs?.reduce(
                                        (acc, log) =>
                                            log.rating
                                                ? acc + log.rating
                                                : acc + 0,
                                        0
                                    ) /
                                        gameLogs.filter((log) => log.rating)
                                            .length}{" "}
                                    Avg. Rating
                                </p>
                            ) : (
                                <p>No Ratings</p>
                            )}
                            <i className="fa-solid fa-star"></i>
                        </span>
                    </div>
                </div>
                {/* Right column */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl tracking-wide text-text-primary">
                        {game?.title}
                    </h2>
                    <p className="text-xl font-light text-text-secondary">
                        Released on{" "}
                        <span className="font-normal">
                            {game?.releaseDate && game?.releaseDate !== "TBA"
                                ? new Date(game?.releaseDate)
                                      .toUTCString()
                                      .slice(5, 16)
                                : "TBA"}
                        </span>
                    </p>
                    <p className="mt-5 line-clamp-[8] text-text-secondary">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sapiente possimus voluptate iusto soluta quae
                        illum reprehenderit nisi, hic vitae at. Dignissimos
                        natus error molestias modi praesentium commodi
                        recusandae consequatur minus. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Sapiente possimus
                        voluptate iusto soluta quae illum reprehenderit nisi,
                        hic vitae at. Dignissimos natus error molestias modi
                        praesentium commodi recusandae consequatur minus. Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Sapiente possimus voluptate iusto soluta quae illum
                        reprehenderit nisi, hic vitae at. Dignissimos natus
                        error molestias modi praesentium commodi recusandae
                        consequatur minus. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Sapiente possimus
                        voluptate iusto soluta quae illum reprehenderit nisi,
                        hic vitae at. Dignissimos natus error molestias modi
                        praesentium commodi recusandae consequatur minus. Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Sapiente possimus voluptate iusto soluta quae illum
                        reprehenderit nisi, hic vitae at. Dignissimos natus
                        error molestias modi praesentium commodi recusandae
                        consequatur minus.
                    </p>
                    <span className="mt-2 flex flex-wrap gap-3">
                        {game?.platforms.map((platform) => {
                            return (
                                <span
                                    className="flex items-center gap-2 rounded-full border-2 border-text-secondary px-2.5 py-0.5 text-text-primary"
                                    key={platform}
                                >
                                    <p>
                                        {
                                            gamePlatforms.find(
                                                (gamePlatform) =>
                                                    gamePlatform.name ===
                                                    platform
                                            )?.display
                                        }
                                    </p>
                                    <i
                                        className={
                                            gamePlatforms.find(
                                                (gamePlatform) =>
                                                    gamePlatform.name ===
                                                    platform
                                            )?.icon
                                        }
                                    ></i>
                                </span>
                            );
                        })}
                    </span>
                </div>
            </span>
        </section>
    );
};

export default GamePage;
