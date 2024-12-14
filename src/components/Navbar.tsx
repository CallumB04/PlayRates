import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    // common styles used on all items in the My Account dropdown menu
    const dropdownItemStyles: string = `opacity-0 group-hover:opacity-100 transition duration-200 
                                        w-11/12 py-1 text-left hover:bg-[#4a4a4a] hover:cursor-pointer rounded
                                        flex gap-2 items-center pl-2`;

    // common styles used on all items in phone dropdown menu
    const phoneDropdownItemStyles: string = `w-11/12 py-2 text-left text-lg hover:bg-[#4a4a4a] hover:cursor-pointer
                                             rounded-md flex gap-3 items-center pl-2`

    // Phone dropdown DOM elements
    const phoneDropdownBtn = useRef<HTMLDivElement | null>(null);
    const phoneDropdown = useRef<HTMLDivElement | null>(null);

    // Function to open / close phone dropdown menu
    const closePhoneDropdown = () => {
        phoneDropdown.current!.classList.remove("w-10/12");
    }

    // Opening phone dropdown menu on button click
    useEffect(() => {
        phoneDropdownBtn.current!.addEventListener("click", 
            () => {
                phoneDropdown.current!.classList.toggle("w-10/12");
            }
        );
    }, [])


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
            <div ref={phoneDropdownBtn} 
                 className="md:hidden absolute right-5 flex flex-col gap-1 group p-[6px]
                            hover:cursor-pointer">
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
                <div className="w-[22px] h-[2px] bg-textColor group-hover:bg-highlightPurple transition-colors"></div>
            </div>

            {/* Phone dropdown menu */}
            <div ref={phoneDropdown} 
                 className="bg-dropdownColor absolute top-navbar right-0 w-0 rounded-l-md
                            overflow-y-scroll overflow-x-hidden transition-width duration-300
                            delay-50 ease-in-out md:hidden flex flex-col items-center gap-2 text-textColor py-3">
                
                {/* All dropdown links currently link to a template account for testing
                    purposes (callum). In the future the links will navigate to the logged in
                    account's pages. E.G: /user/<username>/played */}
                
                <Link className={`${phoneDropdownItemStyles} pl-[9px]`} to="/user/callum">
                    <i className="fa-solid fa-user text-highlightPurple"></i>
                    <p>My Profile</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="/user/callum">
                    <i className="fas fa-magnifying-glass text-highlightPurple"></i>
                    <p>Browse Games</p>
                </Link>

                <span className="pt-[1px] my-1 w-11/12 bg-textColor"></span>

                <Link className={`${phoneDropdownItemStyles}`} to="/user/callum/played">
                    <i className="fa-regular fa-check-circle text-highlightPurple"></i>
                    <p>Played</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="/user/callum/playing">
                    <i className="fa-regular fa-play-circle text-highlightPurple"></i>
                    <p>Playing</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="/user/callum/backlog">
                    <i className="fa-regular fa-calendar-plus text-highlightPurple"></i>
                    <p>Backlog</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="/user/callum/wishlist">
                    <i className="fa-solid fa-heart text-highlightPurple"></i>
                    <p>Wishlist</p>
                </Link>

                <span className="pt-[1px] my-1 w-11/12 bg-textColor"></span>

                <Link className={`${phoneDropdownItemStyles}`} to="/settings">
                    <i className="fa-solid fa-cog text-highlightPurple"></i>
                    <p>Settings</p>
                </Link>
                <Link className={`${phoneDropdownItemStyles}`} to="">
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
                                    group-hover:h-[280px] transition-height duration-[400ms] delay-50 ease-in-out
                                    hover:block hover:cursor-default group-hover:block">
                        {/* Dropdown menu content */}
                        <div className="w-full h-full bg-dropdownColor rounded-b-md overflow-hidden
                                        flex items-center flex-col gap-[2px] font-normal">
                            
                            {/* All dropdown links currently link to a template account for testing
                                purposes (callum). In the future the links will navigate to the logged in
                                account's pages. E.G: /user/<username>/played */}

                            <Link className={`${dropdownItemStyles} mt-3 pl-[9px]`} to="/user/callum">
                                <i className="fa-solid fa-user text-highlightPurple"></i>
                                <p>My Profile</p>
                            </Link>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                            pt-[1px] my-1 w-11/12 bg-textColor"></span>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/played">
                                <i className="fa-regular fa-check-circle text-highlightPurple"></i>
                                <p>Played</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/playing">
                                <i className="fa-regular fa-play-circle text-highlightPurple"></i>
                                <p>Playing</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/backlog">
                                <i className="fa-regular fa-calendar-plus text-highlightPurple"></i>
                                <p>Backlog</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/wishlist">
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
                        className="block w-60 lg:w-72 px-2 py-1.5 bg-neutral-700 rounded focus:outline-none pr-9"
                    />
                    <i className="fas fa-magnifying-glass absolute 
                                  transform -translate-y-1/2 top-1/2 right-1 p-2
                                  text-neutral-400 hover:text-highlightPurple hover:cursor-pointer
                                  transition-colors"></i>
                </span>
            </div>            
        </nav>
    );
}

export default Navbar;