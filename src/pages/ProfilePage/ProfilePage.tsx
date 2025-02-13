import { useLocation, useParams } from "react-router-dom";
import { useUser } from "../../App";
import { fetchUserByUsername, UserAccount } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProfileError from "./components/ProfileError";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProfilePicture from "../../components/ProfilePicture";
import UserStatus from "../../components/UserStatus";
import { useEffect, useState } from "react";
import GameElement from "./components/GameElement";

interface ProfilePageProps {
    runNotification: (text: string, type: "success" | "error") => void;
    openLoginForm: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
    runNotification,
    openLoginForm,
}) => {
    const currentUser = useUser(); // getting the currently logged in user
    const { targetUsername } = useParams(); // getting user from URL as their username

    // getting game type from url search params
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const URLGamesSection = urlParams.get("type") || "played"; // getting game section (played, playing, etc) - default to played if no url data

    // currently displayed section (played, playing, backlog, etc)
    const [activeGamesSection, setActiveGamesSection] = useState<string>("");

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [maxPageNumber, setMaxPageNumber] = useState<number>(1); // re-calculates when window width updates, final page number based on games
    const [gamesPerPage, setGamesPerPage] = useState<number>(50); // updated when window width updates
    const [previousEnabled, setPreviousEnabled] = useState<boolean>(true); // whether previous button can be pressed (page number > 1)
    const [nextEnabled, setNextEnabled] = useState<boolean>(true); // whether next button can be pressed (not at final page)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    // handling window resizing
    useEffect(() => {
        // updates state with window width
        const handleResize = () => setWindowWidth(window.innerWidth);

        // listening for window resizing and matching it in state
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // updating state when window resizes
    useEffect(() => {
        // updating games per page when window resizes
        if (windowWidth >= 1280) {
            setGamesPerPage(27);
        } else if (windowWidth >= 1024) {
            setGamesPerPage(21);
        } else if (windowWidth >= 768) {
            setGamesPerPage(28);
        } else {
            setGamesPerPage(24);
        }
    }, [windowWidth]);

    // update game section if navbar option is clicked within the profile page
    useEffect(() => {
        setActiveGamesSection(URLGamesSection);
    }, [location]);

    // resetting to page 1 when changing sections
    useEffect(() => {
        setPageNumber(1);
    }, [activeGamesSection]);

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

    // if no user in the URL, returns error
    if (!targetUsername) {
        runNotification("No user found in URL", "error");
        return <ProfileError />;
    }

    // fetching user from API using react query
    const {
        data: targetUser,
        error: targetUserError,
        isLoading: targetUserLoading,
    } = useQuery<UserAccount | undefined>({
        queryKey: ["targetUser", targetUsername],
        queryFn: () => fetchUserByUsername(targetUsername),
    });

    // boolean whether edit profile / add friend button is being hovered
    const [isHoveringProfileButton, setIsHoveringProfileButton] =
        useState<boolean>(false);

    // checking user relation (friends, request-sent, etc)... Empty "" if user on own account
    const [userRelation, setUserRelation] = useState<string>("");

    // updating maximum page number when games per page or section changes
    useEffect(() => {
        if (targetUser) {
            // calculate total amount of games in current open section
            const overallCount = targetUser?.games.filter(
                (gameLog) => gameLog.status === activeGamesSection
            ).length;

            const maxPages = Math.floor(overallCount / gamesPerPage) + 1;
            setMaxPageNumber(maxPages);
        }
    }, [gamesPerPage, activeGamesSection, targetUser]);

    useEffect(() => {
        // search if target user in current users friend list
        const friend = currentUser?.friends.find(
            (user) => user.id === targetUser?.id
        );

        if (friend) {
            // setting user relation as status
            setUserRelation(friend.status);
        } else {
            // emptying user relation if not found in friends list
            setUserRelation("");
        }
    }, [currentUser, targetUser]);

    // function to get icon for button from current and target user relation
    const getUserRelationIcon = () => {
        switch (userRelation) {
            case "friend":
                return isHoveringProfileButton ? "user-xmark" : "user-group";
            case "request-sent":
                return isHoveringProfileButton ? "user-xmark" : "user-clock";
            case "request-received":
                return "user-check";
            case "":
                return "user-plus";
        }
    };

    // function to get text for button from current and target user relation
    const getUserRelationText = () => {
        switch (userRelation) {
            case "friend":
                return isHoveringProfileButton ? "Remove Friend" : "Friends";
            case "request-sent":
                return isHoveringProfileButton
                    ? "Cancel Request"
                    : "Request Sent";
            case "request-received":
                return "Accept Request";
            case "":
                return "Add Friend";
        }
    };

    // function to get text for button from current and target user relation
    const getUserRelationColors = () => {
        switch (userRelation) {
            case "friend":
                return "text-green-400 hover:text-red-400 border-green-500 hover:border-red-500";
            case "request-sent":
                return "text-orange-300 hover:text-red-400 border-orange-400 hover:border-red-500";
            case "request-received":
                return "text-green-300 hover:text-green-500 border-green-400 hover:border-green-600";
            case "":
                return "text-text-primary hover:text-green-500 border-text-primary hover:border-green-600";
        }
    };

    // user doesnt exist / failed to fetch
    if (targetUserError) {
        runNotification("Failed to fetch user data", "error");
        return <ProfileError />;
    }

    // show user that profile is being loaded
    if (targetUserLoading) {
        return (
            <div className="absolute left-0 top-0 flex h-[calc(100vh-64px)] w-screen items-center justify-center">
                <div className="mx-auto flex h-full w-max flex-row items-center justify-center gap-6">
                    <LoadingSpinner size={8} />
                    <p className="font-lexend text-xl tracking-wide text-text-primary">
                        Loading User Profile...
                    </p>
                </div>
            </div>
        );
    }

    // successful user profile load
    if (targetUser) {
        return (
            <div className="flex w-full flex-col gap-5 overflow-hidden lg:h-[85vh] lg:flex-row">
                {/* Profile card */}
                <div className="card flex w-full min-w-[300px] flex-row items-center justify-between font-lexend lg:max-w-[300px] lg:flex-col">
                    <div className="flex w-full flex-row items-center gap-5 sm:gap-6 lg:flex-col lg:gap-7">
                        <div className="flex flex-col items-center gap-2">
                            <ProfilePicture
                                sizes={[
                                    { value: 20 },
                                    { value: 28, breakpoint: "sm" },
                                    { value: 40, breakpoint: "lg" },
                                ]}
                                user={targetUser}
                            />
                            {/* User status (online, offline, etc). Currently only set to online if current user is on their page */}
                            <UserStatus
                                status={
                                    currentUser === targetUser
                                        ? "online"
                                        : "offline"
                                }
                                sizes={[
                                    { value: "sm" },
                                    { value: "lg", breakpoint: "sm" },
                                ]}
                            />
                        </div>
                        <div className="flex w-3/5 flex-col gap-6 sm:max-w-full lg:w-full">
                            <div className="flex w-full flex-col gap-3">
                                <h2 className="overflow-hidden break-all text-left text-xl font-semibold text-text-primary sm:text-2xl">
                                    {targetUser.username}
                                </h2>

                                <p className="line-clamp-3 text-balance break-words text-left text-sm font-light text-text-secondary sm:text-base lg:line-clamp-5">
                                    {targetUser.bio
                                        ? targetUser.bio
                                        : "User hasn't added a bio."}
                                </p>
                            </div>
                            {currentUser ? (
                                <button
                                    className={`button-outline hidden w-full items-center justify-center gap-4 lg:flex ${currentUser === targetUser ? "border-text-primary text-text-primary hover:border-highlight-primary hover:text-highlight-hover" : getUserRelationColors()}`}
                                    onMouseOver={() =>
                                        setIsHoveringProfileButton(true)
                                    }
                                    onMouseOut={() =>
                                        setIsHoveringProfileButton(false)
                                    }
                                >
                                    <p className="text-lg">
                                        {currentUser === targetUser
                                            ? "Edit Profile"
                                            : getUserRelationText()}
                                    </p>
                                    <i
                                        className={`fas text-lg fa-${
                                            currentUser === targetUser
                                                ? "pen"
                                                : getUserRelationIcon()
                                        }`}
                                    />
                                </button>
                            ) : (
                                <button
                                    className="button-outline hidden items-center justify-center gap-4 text-lg text-text-primary hover:cursor-pointer hover:border-highlight-primary hover:text-highlight-primary lg:flex"
                                    onClick={openLoginForm}
                                >
                                    <p>Login to add</p>
                                    <i className="fas fa-right-to-bracket"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse items-center justify-end gap-3 sm:h-[148px] sm:flex-row sm:items-start lg:h-max lg:flex-col lg:gap-4">
                        {/* Friends list button */}
                        <div className="group flex gap-3 hover:cursor-pointer lg:items-center 2xl:hidden">
                            <i className="fas fa-users text-2xl text-text-primary transition-colors duration-200 hover:cursor-pointer group-hover:text-highlight-primary lg:text-[22px]"></i>
                            <p className="hidden text-xl text-text-primary transition-colors duration-200 group-hover:text-highlight-primary lg:block lg:text-[22px]">
                                Friends
                            </p>
                        </div>
                        {/* Edit profile icon button (mobile) */}
                        {currentUser === targetUser ? (
                            <i className="fas fa-pen text-2xl text-text-primary transition-colors duration-200 hover:cursor-pointer hover:text-highlight-primary lg:hidden lg:text-[22px]"></i>
                        ) : (
                            <></>
                        )}
                        {/* Profile Settings button */}
                        {currentUser === targetUser ? (
                            <div className="group flex gap-3 hover:cursor-pointer lg:items-center">
                                <i className="fas fa-cog text-2xl text-text-primary transition-colors duration-200 group-hover:text-highlight-primary lg:text-[22px]"></i>
                                <p className="hidden text-xl text-text-primary transition-colors duration-200 group-hover:text-highlight-primary lg:block lg:text-[22px]">
                                    Settings
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {/* Games card */}
                <div className="card relative w-full lg:flex-grow">
                    {/* Header */}
                    <div className="flex w-full justify-between">
                        <h2 className="card-header-text">Game Library</h2>

                        {/* Search bar and filter button */}
                        <div className="flex items-center gap-4 md:gap-5">
                            {/* Game Section (played, playing, etc) icon (mobile) */}
                            <i
                                className="fas fa-list hover-text-white text-xl md:hidden"
                                title="Game Section"
                            ></i>
                            {/* Filters icon (mobile) */}
                            <i
                                className="fas fa-filter hover-text-white text-xl md:hidden"
                                title="Filters"
                            ></i>
                            {/* Filters button */}
                            <button className="hover-text-white button-outline hidden h-11 items-center gap-3 hover:border-highlight-primary md:flex">
                                <p className="font-lexend">Filters</p>
                                <i
                                    className="fas fa-filter"
                                    title="Filters"
                                ></i>
                            </button>
                            {/* Search bar */}
                            <span className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for game..."
                                    className="search-bar hidden h-11 w-60 md:block xl:w-72"
                                />
                                <i
                                    className="fas fa-magnifying-glass relative text-xl text-text-primary transition-colors hover:cursor-pointer hover:text-highlight-primary md:absolute md:right-1 md:top-1/2 md:-translate-y-1/2 md:transform md:p-2 md:text-base md:text-searchInput-icon"
                                    title="Search"
                                ></i>
                            </span>
                        </div>
                    </div>
                    {/* Game section navigation (played, playing, etc) */}
                    <div className="mx-auto mt-12 hidden w-max font-lexend text-lg text-text-primary md:flex">
                        {["played", "playing", "backlog", "wishlist"].map(
                            (sectionName) => {
                                return (
                                    <p
                                        className={`w-36 border-b-4 pb-2 text-center 2xl:w-40 ${activeGamesSection === sectionName ? "border-b-highlight-hover" : "border-b-[#cacaca55] hover:border-b-highlight-primary"} transition-colors hover:cursor-pointer hover:text-highlight-hover`}
                                        onClick={() =>
                                            setActiveGamesSection(sectionName)
                                        }
                                        key={sectionName}
                                    >
                                        {sectionName[0].toUpperCase() +
                                            sectionName.slice(1)}
                                    </p>
                                );
                            }
                        )}
                    </div>
                    {/* Game logs */}
                    <div className="mt-6 flex w-full flex-wrap justify-center">
                        {targetUser.games
                            .filter(
                                (gameLog) =>
                                    gameLog.status === activeGamesSection
                            )
                            .slice(
                                (pageNumber - 1) * gamesPerPage,
                                gamesPerPage * pageNumber
                            )
                            .map((gameLog) => {
                                return (
                                    <GameElement
                                        key={gameLog.id}
                                        gameLog={gameLog}
                                    />
                                );
                            })}
                    </div>
                    {/* Page numbers and page change buttons */}
                    <div className="mt-12 flex items-center justify-center gap-6 sm:bottom-6 lg:absolute lg:bottom-4 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:transform">
                        {/* Previous Button */}
                        <button
                            className={`${previousEnabled ? "border-text-primary text-text-primary hover:border-highlight-primary hover:text-highlight-primary" : "border-[#ffffff55] text-[#ffffff55]"} button-outline flex h-10 w-28 items-center justify-center border-text-primary text-text-primary`}
                            onClick={() =>
                                previousEnabled
                                    ? setPageNumber(pageNumber - 1)
                                    : null
                            }
                        >
                            Previous
                        </button>
                        {/* Page number text */}
                        <p className="font-lexend text-lg text-text-primary">
                            {pageNumber} of {maxPageNumber}
                        </p>

                        {/* Next Button */}
                        <button
                            className={`button-outline flex h-10 w-28 items-center justify-center ${nextEnabled ? "border-text-primary text-text-primary hover:border-highlight-primary hover:text-highlight-primary" : "border-[#ffffff55] text-[#ffffff55]"} `}
                            onClick={() =>
                                nextEnabled
                                    ? setPageNumber(pageNumber + 1)
                                    : null
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
                {/* Friends / Socials */}
                <div className="hidden min-w-[300px] max-w-[300px] flex-col gap-5 2xl:flex">
                    <div className="card h-3/5 w-full">
                        <h2 className="card-header-text">Friends</h2>
                    </div>
                    <div className="card h-2/5 w-full">
                        <h2 className="card-header-text">Reviews</h2>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProfilePage;
