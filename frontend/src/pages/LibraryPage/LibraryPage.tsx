import { useQuery } from "@tanstack/react-query";
import { fetchGameLogsByUserID, fetchGames, Game, GameLog } from "../../api";
import { useUser } from "../../App";
import GameElement from "./components/GameElement";
import { useEffect, useRef, useState } from "react";
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

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(
        window.innerHeight
    );
    const [gamesPerPage, setGamesPerPage] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [maxPageNumber, setMaxPageNumber] = useState<number>(1); // re-calculates when window width updates, final page number based on games
    const [previousEnabled, setPreviousEnabled] = useState<boolean>(true); // whether previous button can be pressed (page number > 1)
    const [nextEnabled, setNextEnabled] = useState<boolean>(true); // whether next button can be pressed (not at final page)

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

    // handling window resizing
    useEffect(() => {
        // updates state with window width and height
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        // listening for window resizing and matching it in state
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // handling max games per page
    useEffect(() => {
        // larger screens
        if (windowWidth >= 1024) {
            // 4 -> gap inbetween game cards
            // 105 -> width of game cards
            // 64 -> left and right padding on page (32 each)
            // 320 -> width of filters card
            // 16 -> gap between filters card and game container
            const gamesPerRow = Math.floor(
                (windowWidth - (64 + 320 + 16) + 4) / (105 + 4)
            );
            // 140 -> height of game cards
            // 160 -> page top and bottom padding (80 each)
            // 128 -> height of header card
            // 12 -> gap between header card and games container
            // TODO: when pagination buttons add, also add this to height total
            const rowsCount = Math.floor(
                (windowHeight - (160 + 128 + 12)) / 140
            );

            setGamesPerPage(gamesPerRow * rowsCount);
        }
        // smaller / mobile screens
        else {
            if (windowWidth < 584) setGamesPerPage(18);
            else if (windowWidth < 755) setGamesPerPage(20);
            else if (windowWidth < 894) setGamesPerPage(20);
            else if (windowWidth < 1024) setGamesPerPage(18);
        }
    }, [windowWidth, windowHeight]);

    // updating next and previous buttons when current or max page number changes
    useEffect(() => {
        // disable previous if on first page
        if (pageNumber === 1) {
            setPreviousEnabled(false);
        } else {
            setPreviousEnabled(true);
        }

        // disable next if on final page
        if (pageNumber === maxPageNumber) {
            setNextEnabled(false);
        } else {
            setNextEnabled(true);
        }
    }, [pageNumber, maxPageNumber]);

    // updating maximum page number when games per page or section changes
    // also checking if page is empty for displaying message
    useEffect(() => {
        if (games) {
            const maxPages = Math.ceil(games.length / gamesPerPage);
            setMaxPageNumber(maxPages);
        }
    }, [gamesPerPage, games]);

    // function ran after successful edit or creation of a log
    const viewUpdatedLog = (log: GameLog) => {
        refetchCurrentUserGameLogs();
        setCurrentVisibleGameLog(log);
        setViewGameLogPopupVisible(true);
    };

    return (
        <section className="flex w-full gap-4">
            {/* Filters Menu (for larger screens) */}
            <aside className="card hidden h-[85vh] min-w-[320px] max-w-[320px] lg:flex">
                <h2 className="card-header-text">Filters</h2>
            </aside>
            {/* Main Container */}
            {gamesLoading || currentUserGameLogsLoading ? (
                <span className="mx-auto flex h-[85vh] w-max flex-row items-center justify-center gap-6">
                    <LoadingSpinner size={8} />
                    <p className="font-lexend text-xl tracking-wide text-text-primary">
                        Loading Games...
                    </p>
                </span>
            ) : (
                <div className="flex w-full flex-col gap-3 lg:h-[85vh]">
                    {/* Header Card */}
                    <div className="card w-full space-y-4 font-lexend">
                        <div className="w-full space-y-1">
                            <h2 className="card-header-text text-center">
                                Game Library
                            </h2>
                            <p className="text-center text-text-secondary">
                                Explore our extensive game library and see what
                                others are playing. You can{" "}
                                <span className="font-semibold">view</span>,{" "}
                                <span className="font-semibold">create</span>,
                                and <span className="font-semibold">edit</span>{" "}
                                your game logs all within this page!
                                {gamesPerPage}
                            </p>
                        </div>
                        {windowWidth < 1024 ? (
                            <span className="flex w-full justify-end font-lexend">
                                <button className="button-outline button-outline-default flex w-full min-w-36 items-center justify-center gap-3 md:w-max">
                                    Filters
                                    <i className="fas fa-filter"></i>
                                </button>
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* Games */}
                    <div className="flex w-full flex-grow flex-col justify-between">
                        <div className="flex flex-wrap justify-center gap-1 lg:grid lg:grid-cols-[repeat(auto-fill,minmax(105px,1fr))]">
                            {games
                                ?.slice(
                                    (pageNumber - 1) * gamesPerPage,
                                    gamesPerPage * pageNumber
                                )
                                .map((game) => {
                                    return (
                                        <GameElement
                                            key={game.id}
                                            game={game}
                                            userLoggedIn={
                                                currentUser ? true : false
                                            }
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
                                                        (log) =>
                                                            log.id === game.id
                                                    )!
                                                );
                                                setViewGameLogPopupVisible(
                                                    true
                                                );
                                            }}
                                            handleEdit={() => {
                                                setCurrentVisibleGameLog(
                                                    currentUserGameLogs?.find(
                                                        (log) =>
                                                            log.id === game.id
                                                    )!
                                                );
                                                setEditGameLogPopupVisible(
                                                    true
                                                );
                                            }}
                                            handleCreate={() => {
                                                setCurrentVisibleGameID(
                                                    game.id
                                                );
                                                setCreateGameLogPopupVisible(
                                                    true
                                                );
                                            }}
                                            popupIsVisible={
                                                viewGameLogPopupVisible ||
                                                editGameLogPopupVisible ||
                                                createGameLogPopupVisible
                                            }
                                        />
                                    );
                                })}
                        </div>
                        <div className="mx-auto mb-4 mt-12 flex w-max items-center justify-center gap-6">
                            {/* Previous Button */}
                            <button
                                className={`${previousEnabled ? "border-text-primary text-text-primary hover:border-highlight-primary hover:text-highlight-primary" : "border-[#ffffff55] text-[#ffffff55]"} button-outline flex h-10 w-16 items-center justify-center sm:w-28`}
                                onClick={() =>
                                    previousEnabled
                                        ? setPageNumber(pageNumber - 1)
                                        : null
                                }
                            >
                                {windowWidth >= 640 ? (
                                    "Previous"
                                ) : (
                                    <i className="fas fa-arrow-left text-lg"></i>
                                )}
                            </button>
                            {/* Page number text */}
                            <p className="font-lexend text-text-primary sm:text-lg">
                                Page {pageNumber} of {maxPageNumber}
                            </p>

                            {/* Next Button */}
                            <button
                                className={`button-outline flex h-10 w-16 items-center justify-center sm:w-28 ${nextEnabled ? "border-text-primary text-text-primary hover:border-highlight-primary hover:text-highlight-primary" : "border-[#ffffff55] text-[#ffffff55]"} `}
                                onClick={() =>
                                    nextEnabled
                                        ? setPageNumber(pageNumber + 1)
                                        : null
                                }
                            >
                                {windowWidth >= 640 ? (
                                    "Next"
                                ) : (
                                    <i className="fas fa-arrow-right text-lg"></i>
                                )}
                            </button>
                        </div>
                    </div>
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
