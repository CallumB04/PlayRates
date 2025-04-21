import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById, fetchGameLogs, Game, GameLog } from "../../api";
import { gamePlatforms, getIconFromGameStatus } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { stat } from "fs";

const GamePage = () => {
    const { gameID } = useParams(); // getting game id from URL
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [gameLogs, setGameLogs] = useState<GameLog[] | undefined>(undefined);

    const [hoveringLogCount, setHoveringLogCount] = useState<boolean>(false);

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
        <section className="mx-auto mt-20 max-w-[1200px] font-lexend">
            <span className="flex flex-col gap-8 md:flex-row">
                {/* Left column */}
                <div className="flex gap-4">
                    <div className="flex w-max flex-col gap-3">
                        <img
                            src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                            className="max-h-64 max-w-52 rounded-md md:max-h-80 md:min-w-52 md:max-w-max"
                        />
                        <div className="flex w-full flex-col gap-2">
                            <span
                                className="relative flex w-full items-center justify-center gap-2 rounded-md border-2 border-text-secondary px-2.5 py-1 text-text-primary"
                                onMouseOver={() => setHoveringLogCount(true)}
                                onMouseOut={() => setHoveringLogCount(false)}
                            >
                                <p>
                                    {gameLogs?.length}{" "}
                                    {gameLogs?.length === 1 ? "Log" : "Logs"}
                                </p>
                                <i className="fa-solid fa-chart-bar"></i>

                                {/* Log count hover menu */}
                                {hoveringLogCount ? (
                                    <div className="hover-menu fade-in-right absolute -right-36 top-0 flex w-max flex-col gap-1 p-3">
                                        {[
                                            "played",
                                            "playing",
                                            "backlog",
                                            "wishlist",
                                        ].map((status) => (
                                            <span className="flex items-center gap-2 font-light">
                                                <i
                                                    className={getIconFromGameStatus(
                                                        status
                                                    )}
                                                ></i>
                                                <p>
                                                    {status
                                                        .slice(0, 1)
                                                        .toUpperCase() +
                                                        status.slice(1)}
                                                    :
                                                </p>
                                                <p>
                                                    {
                                                        gameLogs?.filter(
                                                            (log) =>
                                                                log.status ===
                                                                status
                                                        ).length
                                                    }
                                                </p>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </span>
                            <span className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-text-secondary px-2.5 py-1 text-text-primary">
                                {gameLogs &&
                                gameLogs.filter((log) => log.rating).length >=
                                    1 ? (
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
                                    <p>No Rating</p>
                                )}
                                <i className="fa-solid fa-star"></i>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 md:hidden">
                        <h2 className="text-2xl tracking-wide text-text-primary sm:text-3xl">
                            {game?.title}
                        </h2>
                        <p className="font-light text-text-secondary sm:text-lg">
                            Released on{" "}
                            <span className="font-normal">
                                {game?.releaseDate &&
                                game?.releaseDate !== "TBA"
                                    ? new Date(game?.releaseDate)
                                          .toUTCString()
                                          .slice(5, 16)
                                    : "TBA"}
                            </span>
                        </p>
                    </div>
                </div>
                {/* Right column */}
                <div className="flex w-full flex-col gap-2">
                    <h2 className="hidden text-4xl tracking-wide text-text-primary md:block">
                        {game?.title}
                    </h2>
                    <p className="hidden text-xl font-light text-text-secondary md:block">
                        Released on{" "}
                        <span className="font-normal">
                            {game?.releaseDate && game?.releaseDate !== "TBA"
                                ? new Date(game?.releaseDate)
                                      .toUTCString()
                                      .slice(5, 16)
                                : "TBA"}
                        </span>
                    </p>
                    <p className="line-clamp-[8] text-center text-text-secondary md:mt-5 md:text-left">
                        {game?.description
                            ? game.description
                            : "This game currently does not have a description."}
                    </p>
                    <span className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
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
