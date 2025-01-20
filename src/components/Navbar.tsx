import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAccount } from "../api";
import { useUser } from "../App";

interface NavbarProps {
    signOutUser: () => void;
    openSignupForm: () => void;
    openLoginForm: () => void;
    closeAccountForm: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    signOutUser,
    openSignupForm,
    openLoginForm,
    closeAccountForm,
}) => {
    // fetching user data from react context
    const user: UserAccount | null = useUser();

    // closing login / singup form when page changes
    const urlPath = useLocation();

    useEffect(() => {
        closeAccountForm();
    }, [urlPath]);

    // common styles used on all items in the My Account dropdown menu
    const dropdownItemStyles: string = `opacity-0 group-hover:opacity-100 transition duration-200 
                                        w-11/12 py-1 text-left hover:bg-[#4a4a4a] hover:cursor-pointer rounded
                                        flex gap-2 items-center pl-2`;

    // common styles used on all items in phone dropdown menu
    const phoneDropdownItemStyles: string = `w-11/12 py-2 text-left text-lg hover:bg-[#4a4a4a] hover:cursor-pointer
                                             rounded-md flex gap-3 items-center pl-2 whitespace-nowrap`;

    // Phone dropdown state
    const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);

    // Function to close phone dropdown menu
    const closePhoneDropdown = () => {
        setPhoneDropdownOpen(false);
    };

    // checking for window scorll to changed navbar opacity
    const [scrollHeight, setScrollHeight] = useState<number>(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollHeight(window.scrollY);
        });
    }, []);

    return (
        <nav
            className={`fixed left-0 top-0 z-50 h-navbar w-screen bg-navbar px-6 xl:px-8 ${scrollHeight < 50 ? "md:bg-transparent" : "md:bg-navbar"} font-lexend flex items-center justify-center transition-colors duration-300 md:justify-between`}
        >
            {/* Site logo, links to home page */}
            <Link to="/" onClick={closePhoneDropdown}>
                <h2 className="font-lexend text-3xl font-semibold tracking-wide text-text-primary md:text-4xl">
                    PlayRates
                </h2>
            </Link>

            {/* Dropdown menu button for phone screens */}
            <div
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                className="group absolute right-5 flex flex-col gap-1 p-[6px] hover:cursor-pointer md:hidden"
            >
                <div className="h-[2px] w-[22px] bg-text-primary transition-colors group-hover:bg-highlight-primary"></div>
                <div className="h-[2px] w-[22px] bg-text-primary transition-colors group-hover:bg-highlight-primary"></div>
                <div className="h-[2px] w-[22px] bg-text-primary transition-colors group-hover:bg-highlight-primary"></div>
            </div>

            {/* Phone dropdown menu */}
            <div
                className={`absolute right-0 top-navbar rounded-l-md bg-dropdown ${phoneDropdownOpen ? "w-9/12" : "w-0"} delay-50 flex max-w-80 flex-col items-center gap-2 overflow-x-hidden overflow-y-scroll py-3 text-text-primary transition-width duration-300 ease-in-out md:hidden`}
            >
                {/* All dropdown links currently link to a template account for testing
                    purposes (callum). In the future the links will navigate to the logged in
                    account's pages. E.G: /user/<username>/played */}

                <span className="relative">
                    <input
                        type="text"
                        placeholder="Search for game..."
                        className="h-12 w-[70vw] max-w-[300px] rounded bg-searchInput-primary px-2 pr-9 focus:outline-none"
                    />
                    <i className="fas fa-magnifying-glass absolute right-1 top-1/2 -translate-y-1/2 transform p-2 text-searchInput-icon transition-colors hover:cursor-pointer hover:text-highlight-primary"></i>
                </span>

                <Link
                    className={`${phoneDropdownItemStyles} gap-[11px] pl-[6px]`}
                    to="/"
                    onClick={closePhoneDropdown}
                >
                    <i className="fas fa-house text-highlight-primary"></i>
                    <p>Home</p>
                </Link>
                {user ? (
                    <Link
                        className={`${phoneDropdownItemStyles} gap-[14px]`}
                        to={`/user/${user?.username}`}
                        onClick={closePhoneDropdown}
                    >
                        <i className="fa-solid fa-user text-highlight-primary"></i>
                        <p>My Profile</p>
                    </Link>
                ) : null}
                <Link
                    className={`${phoneDropdownItemStyles}`}
                    to="/library"
                    onClick={closePhoneDropdown}
                >
                    <i className="fas fa-magnifying-glass text-highlight-primary"></i>
                    <p>Browse Games</p>
                </Link>

                {user ? (
                    <>
                        <span className="my-1 w-11/12 bg-text-primary pt-[1px]"></span>

                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to={`/user/${user?.username}/played`}
                            onClick={closePhoneDropdown}
                        >
                            <i className="fa-regular fa-check-circle text-highlight-primary"></i>
                            <p>Played</p>
                        </Link>
                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to={`/user/${user?.username}/playing`}
                            onClick={closePhoneDropdown}
                        >
                            <i className="fa-regular fa-play-circle text-highlight-primary"></i>
                            <p>Playing</p>
                        </Link>
                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to={`/user/${user?.username}/backlog`}
                            onClick={closePhoneDropdown}
                        >
                            <i className="fa-regular fa-calendar-plus text-highlight-primary"></i>
                            <p>Backlog</p>
                        </Link>
                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to={`/user/${user?.username}/wishlist`}
                            onClick={closePhoneDropdown}
                        >
                            <i className="fa-solid fa-heart text-highlight-primary"></i>
                            <p>Wishlist</p>
                        </Link>

                        <span className="my-1 w-11/12 bg-text-primary pt-[1px]"></span>

                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to="/settings"
                            onClick={closePhoneDropdown}
                        >
                            <i className="fa-solid fa-cog text-highlight-primary"></i>
                            <p>Settings</p>
                        </Link>
                        <Link
                            className={`${phoneDropdownItemStyles}`}
                            to="/"
                            onClick={() => {
                                closePhoneDropdown();
                                signOutUser();
                            }}
                        >
                            <i className="fa-solid fa-right-from-bracket text-highlight-primary"></i>
                            <p>Sign Out</p>
                        </Link>
                    </>
                ) : (
                    <>
                        <p
                            className={`${phoneDropdownItemStyles}`}
                            onClick={() => {
                                closePhoneDropdown();
                                openLoginForm();
                            }}
                        >
                            <i className="fas fa-sign-in-alt text-highlight-primary"></i>
                            <span>Log In</span>
                        </p>
                        <p
                            className={`${phoneDropdownItemStyles} gap-[8px]`}
                            onClick={() => {
                                closePhoneDropdown();
                                openSignupForm();
                            }}
                        >
                            <i className="fas fa-user-plus text-highlight-primary"></i>
                            <span>Sign Up</span>
                        </p>
                    </>
                )}
            </div>

            {/* Navbar items wrapper */}
            <div className="font-lexend hidden h-full items-center gap-4 font-normal text-text-primary md:flex">
                {/* My Account and Dropdown wrapper */}
                {user ? (
                    <span className="group relative">
                        {/* My Account text */}
                        <span className="flex items-center gap-1 p-2 hover:cursor-pointer group-hover:mt-3 group-hover:pb-5">
                            <p className="transition duration-75 group-hover:text-highlight-primary">
                                My Account
                            </p>
                            <i className="fa fa-chevron-down text-sm transition duration-75 group-hover:text-highlight-primary"></i>
                        </span>

                        {/* Dropdown menu wrapper */}
                        <div className="delay-50 absolute top-[52px] mx-auto h-0 w-60 transition-height duration-[400ms] ease-in-out hover:block hover:cursor-default group-hover:top-navbar group-hover:block group-hover:h-[315px]">
                            {/* Dropdown menu content */}
                            <div className="flex h-full w-full flex-col items-center gap-[2px] overflow-hidden rounded-b-md bg-dropdown font-normal">
                                {/* All dropdown links currently link to a template account for testing
                                purposes (callum). In the future the links will navigate to the logged in
                                account's pages. E.G: /user/<username>/played */}

                                <Link
                                    className={`${dropdownItemStyles} mt-3 pl-[6px]`}
                                    to="/"
                                >
                                    <i className="fas fa-house text-highlight-primary"></i>
                                    <p>Home</p>
                                </Link>
                                <Link
                                    className={`${dropdownItemStyles} gap-[10px] pl-2`}
                                    to={`/user/${user?.username}`}
                                >
                                    <i className="fa-solid fa-user text-highlight-primary"></i>
                                    <p>My Profile</p>
                                </Link>
                                <span className="my-1 w-11/12 bg-text-primary pt-[1px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to={`/user/${user?.username}/played`}
                                >
                                    <i className="fa-regular fa-check-circle text-highlight-primary"></i>
                                    <p>Played</p>
                                </Link>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to={`/user/${user?.username}/playing`}
                                >
                                    <i className="fa-regular fa-play-circle text-highlight-primary"></i>
                                    <p>Playing</p>
                                </Link>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to={`/user/${user?.username}/backlog`}
                                >
                                    <i className="fa-regular fa-calendar-plus text-highlight-primary"></i>
                                    <p>Backlog</p>
                                </Link>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to={`/user/${user?.username}/wishlist`}
                                >
                                    <i className="fa-solid fa-heart text-highlight-primary"></i>
                                    <p>Wishlist</p>
                                </Link>
                                <span className="my-1 w-11/12 bg-text-primary pt-[1px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to="/settings"
                                >
                                    <i className="fa-solid fa-cog text-highlight-primary"></i>
                                    <p>Settings</p>
                                </Link>
                                <Link
                                    className={`${dropdownItemStyles}`}
                                    to="/"
                                    onClick={signOutUser}
                                >
                                    <i className="fa-solid fa-right-from-bracket text-highlight-primary"></i>
                                    <p>Sign Out</p>
                                </Link>
                            </div>
                        </div>
                    </span>
                ) : (
                    <>
                        {/* Sign up and login buttons if no user account */}
                        <p
                            onClick={openLoginForm}
                            className="block p-2 transition duration-75 hover:cursor-pointer hover:text-highlight-primary"
                        >
                            Log in
                        </p>
                        <p
                            onClick={openSignupForm}
                            className="block p-2 transition duration-75 hover:cursor-pointer hover:text-highlight-primary"
                        >
                            Sign up
                        </p>
                    </>
                )}
                {/* Games library link text */}
                <Link to="/library">
                    <p className="block p-2 transition duration-75 hover:cursor-pointer hover:text-highlight-primary">
                        Browse Games
                    </p>
                </Link>
                {/* Text input to search for game */}
                <span className="relative">
                    <input
                        type="text"
                        placeholder="Search for game..."
                        className="block w-60 rounded bg-searchInput-primary px-2 py-1.5 pr-9 focus:outline-none lg:w-72"
                    />
                    <i className="fas fa-magnifying-glass absolute right-1 top-1/2 -translate-y-1/2 transform p-2 text-searchInput-icon transition-colors hover:cursor-pointer hover:text-highlight-primary"></i>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
