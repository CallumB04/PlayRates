import { Link } from "react-router-dom";

function Navbar() {

    // common styles used on all items in the My Account dropdown menu
    const dropdownItemStyles: string = `opacity-0 group-hover:opacity-100 transition duration-200 
                                        w-11/12 py-1 text-left hover:bg-[#4a4a4a] hover:cursor-pointer rounded
                                        flex gap-2 items-center pl-2`;

    return (
        <nav className="absolute top-0 left-0 z-50 w-screen h-16 px-6 xl:px-8 bg-[#232323] 
                        flex justify-center md:justify-between items-center">
            <Link to="/">
                <h2 className="font-semibold font-ssp text-gray-100 text-4xl tracking-wide">PlayRates</h2>
            </Link>
            <div className="hidden md:flex font-ssp font-normal text-gray-100 h-full gap-4 items-center">
                <span className="relative group">
                    <Link to="/account" className="flex gap-1 items-center p-2 hover:cursor-pointer 
                                                   group-hover:pb-5 group-hover:mt-3">
                        <p className="group-hover:text-purple-600 transition duration-75">My Account</p>
                        <i className="fa fa-chevron-down text-sm group-hover:text-purple-600 transition duration-75"></i>
                    </Link>

                    <div className="absolute mx-auto w-60 h-0 top-[52px] group-hover:top-16
                                    group-hover:h-[280px] transition-height duration-[400ms] delay-50 ease-in-out
                                    hover:block hover:cursor-default group-hover:block">
                        <div className="w-full h-full bg-[#333] rounded-b-md overflow-hidden
                                        flex items-center flex-col gap-[2px] font-normal">
                            
                            {/* All dropdown links currently link to a template account for testing
                                purposes (callum). In the future the links will navigate to the logged in
                                account's pages. E.G: /user/<username>/played */}

                            <Link className={`${dropdownItemStyles} mt-3 gap-[9px]`} to="/user/callum">
                                <i className="fa-solid fa-user text-purple-600"></i>
                                <p>My Profile</p>
                            </Link>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                            pt-[1px] my-1 w-11/12 bg-gray-100"></span>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/played">
                                <i className="fa-regular fa-check-circle text-purple-600"></i>
                                <p>Played</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/playing">
                                <i className="fa-regular fa-play-circle text-purple-600"></i>
                                <p>Playing</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/backlog">
                                <i className="fa-regular fa-calendar-plus text-purple-600"></i>
                                <p>Backlog</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="/user/callum/wishlist">
                                <i className="fa-solid fa-heart text-purple-600"></i>
                                <p>Wishlist</p>
                            </Link>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                            pt-[1px] my-1 w-11/12 bg-gray-100"></span>
                            <Link className={`${dropdownItemStyles}`} to="/settings">
                                <i className="fa-solid fa-cog text-purple-600"></i>
                                <p>Settings</p>
                            </Link>
                            <Link className={`${dropdownItemStyles}`} to="">
                                <i className="fa-solid fa-right-from-bracket text-purple-600"></i>
                                <p>Sign Out</p>
                            </Link>

                        </div>
                    </div>
                </span>
                <Link to="/library">
                    <p className="block p-2 transition duration-75 hover:cursor-pointer hover:text-purple-600">
                        Browse Games
                    </p>
                </Link>
                <input 
                    type="text" 
                    placeholder="Search for game..."
                    className="block w-60 lg:w-72 px-2 py-1.5 bg-neutral-700 rounded focus:outline-none"
                />
            </div>            
        </nav>
    );
}

export default Navbar;