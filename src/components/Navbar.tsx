import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAccount } from "../App";

interface NavbarProps {
    userData: UserAccount | null;
}

const Navbar: React.FC<NavbarProps> = ({ userData }) => {

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

    return (
        <nav className="absolute top-0 left-0 z-50 w-screen h-navbar px-6 xl:px-8 bg-navbarColor 
                        flex justify-center md:justify-between items-center">
            {/* Site logo, links to home page */}
            <Link to="/" onClick={closePhoneDropdown}>
                <h2 className="font-semibold font-ssp text-textColor text-3xl md:text-4xl tracking-wide">
                    PlayRates
                </h2>
            </Link>

            {/* Dropdown menu button for phone screens */}
            <div onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)} 
                 className="md:hidden absolute right-5 flex flex-col gap-1 group p-[6px]
                            hover:cursor-pointer">
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
            </div>

            {/* Phone dropdown menu */}
            <div className={`bg-dropdownColor absolute top-navbar right-0 rounded-l-md
                            ${phoneDropdownOpen ? "w-9/12" : "w-0"}
                            overflow-y-scroll overflow-x-hidden transition-width duration-300
                            delay-50 ease-in-out md:hidden flex flex-col items-center gap-2 text-textColor py-3`}>
                
                {/* All dropdown links currently link to a template account for testing
                    purposes (callum). In the future the links will navigate to the logged in
                    account's pages. E.G: /user/<username>/played */}

                <span className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for game..."
                        className="w-[70vw] h-12 px-2 bg-searchInputColor rounded focus:outline-none pr-9"
                    />
                    <i className="fas fa-magnifying-glass absolute 
                                  transform -translate-y-1/2 top-1/2 right-1 p-2
                                  text-searchInputIconColor hover:text-highlightPurple hover:cursor-pointer
                                  transition-colors"></i>
                </span>
                
                <Link className={`${phoneDropdownItemStyles} pl-[6px] gap-[11px]`} to="/" onClick={closePhoneDropdown}>
                    <i className="fas fa-house text-highlightPurple"></i>
                    <p>Home</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles} gap-[14px]`} to={`/user/${userData?.accountName}`} onClick={closePhoneDropdown}>
                    <i className="fa-solid fa-user text-highlightPurple"></i>
                    <p>My Profile</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="/library" onClick={closePhoneDropdown}>
                    <i className="fas fa-magnifying-glass text-highlightPurple"></i>
                    <p>Browse Games</p>
                </Link>

                <span className="pt-[1px] my-1 w-11/12 bg-textColor"></span>

                <Link className={`${phoneDropdownItemStyles}`} to={`/user/${userData?.accountName}/played`} onClick={closePhoneDropdown}>
                    <i className="fa-regular fa-check-circle text-highlightPurple"></i>
                    <p>Played</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to={`/user/${userData?.accountName}/playing`} onClick={closePhoneDropdown}>
                    <i className="fa-regular fa-play-circle text-highlightPurple"></i>
                    <p>Playing</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to={`/user/${userData?.accountName}/backlog`} onClick={closePhoneDropdown}>
                    <i className="fa-regular fa-calendar-plus text-highlightPurple"></i>
                    <p>Backlog</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to={`/user/${userData?.accountName}/wishlist`} onClick={closePhoneDropdown}>
                    <i className="fa-solid fa-heart text-highlightPurple"></i>
                    <p>Wishlist</p>
                </Link>

                <span className="pt-[1px] my-1 w-11/12 bg-textColor"></span>

                <Link className={`${phoneDropdownItemStyles}`} to="/settings" onClick={closePhoneDropdown}>
                    <i className="fa-solid fa-cog text-highlightPurple"></i>
                    <p>Settings</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="" onClick={closePhoneDropdown}>
                    <i className="fa-solid fa-right-from-bracket text-highlightPurple"></i>
                    <p>Sign Out</p>
                </Link>

            </div>

            {/* Navbar items wrapper */}
            <div className="hidden md:flex font-ssp font-normal text-textColor h-full gap-4 items-center">
                {/* My Account and Dropdown wrapper */}
                <span className="relative group">
                    {/* My Account text */}
                    <span className="flex gap-1 items-center p-2 hover:cursor-pointer 
                                                   group-hover:pb-5 group-hover:mt-3">
                        <p className="group-hover:text-highlightPurple transition duration-75">My Account</p>
                        <i className="fa fa-chevron-down text-sm group-hover:text-highlightPurple transition duration-75"></i>
                    </span>

                    {/* Dropdown menu wrapper */}
                    <div className="absolute mx-auto w-60 h-0 top-[52px] group-hover:top-navbar
                                    group-hover:h-[315px] transition-height duration-[400ms] delay-50 ease-in-out
                                    hover:block hover:cursor-default group-hover:block">
                        {/* Dropdown menu content */}
                        <div className="w-full h-full bg-dropdownColor rounded-b-md overflow-hidden
                                        flex items-center flex-col gap-[2px] font-normal">
                            
                            {/* All dropdown links currently link to a template account for testing
                                purposes (callum). In the future the links will navigate to the logged in
                                account's pages. E.G: /user/<username>/played */}

                            <Link className={`${dropdownItemStyles} mt-3 pl-[6px]`} to="/">
                                <i className="fas fa-house text-highlightPurple"></i>
                                <p>Home</p>
                            </Link>
                            <Link className={`${dropdownItemStyles} pl-2 gap-[10px]`} to={`/user/${userData?.accountName}`}>
                                <i className="fa-solid fa-user text-highlightPurple"></i>
                                <p>My Profile</p>
                            </Link>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                            pt-[1px] my-1 w-11/12 bg-textColor"></span>
                            <Link className={`${dropdownItemStyles}`} to={`/user/${userData?.accountName}/played`}>
                                <i className="fa-regular fa-check-circle text-highlightPurple"></i>
                                <p>Played</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to={`/user/${userData?.accountName}/playing`}>
                                <i className="fa-regular fa-play-circle text-highlightPurple"></i>
                                <p>Playing</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to={`/user/${userData?.accountName}/backlog`}>
                                <i className="fa-regular fa-calendar-plus text-highlightPurple"></i>
                                <p>Backlog</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to={`/user/${userData?.accountName}/wishlist`}>
                                <i className="fa-solid fa-heart text-highlightPurple"></i>
                                <p>Wishlist</p>
                            </Link>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                            pt-[1px] my-1 w-11/12 bg-textColor"></span>
                            <Link className={`${dropdownItemStyles}`} to="/settings">
                                <i className="fa-solid fa-cog text-highlightPurple"></i>
                                <p>Settings</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="">
                                <i className="fa-solid fa-right-from-bracket text-highlightPurple"></i>
                                <p>Sign Out</p>
                            </Link>

                        </div>
                    </div>
                </span>
                {/* Games library link text */}
                <Link to="/library">
                    <p className="block p-2 transition duration-75 hover:cursor-pointer hover:text-highlightPurple">
                        Browse Games
                    </p>
                </Link>
                {/* Text input to search for game */}
                <span className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for game..."
                        className="block w-60 lg:w-72 px-2 py-1.5 bg-searchInputColor rounded focus:outline-none pr-9"
                    />
                    <i className="fas fa-magnifying-glass absolute 
                                  transform -translate-y-1/2 top-1/2 right-1 p-2
                                  text-searchInputIconColor hover:text-highlightPurple hover:cursor-pointer
                                  transition-colors"></i>
                </span>
            </div>            
        </nav>
    );
}

export default Navbar;