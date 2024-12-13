import { Link } from "react-router-dom";

function Navbar() {

    // common styles used on all items in the My Account dropdown menu
    const dropdownItemStyles: string = `opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                        w-10/12 text-center`;

    return (
        <nav className="absolute top-0 left-0 z-50 w-screen h-16 px-6 xl:px-8 bg-[#232323] 
                        flex justify-center md:justify-between items-center">
            <h2 className="font-semibold font-ssp text-gray-100 text-4xl tracking-wide">PlayRates</h2>
            <div className="hidden md:flex font-ssp font-normal text-gray-100 h-full gap-4 items-center">
                <span className="relative group">
                    <Link to="/account" className="flex gap-1 items-center p-2 hover:cursor-pointer 
                                                   group-hover:pb-5 group-hover:mt-3">
                        <p className="group-hover:text-purple-600 transition duration-75">My Account</p>
                        <i className="fa fa-chevron-down text-sm group-hover:text-purple-600 transition duration-75"></i>
                    </Link>

                    <div className="absolute mx-auto w-60 h-0 top-[52px] group-hover:top-16
                                    group-hover:h-64 transition-height duration-[400ms] delay-50 ease-in-out
                                    hover:block hover:cursor-default group-hover:block">
                        <div className="w-full h-full bg-neutral-700 rounded-b-md overflow-hidden
                                        flex items-center flex-col font-normal">
                            <p className={`${dropdownItemStyles} pt-3`}>My Profile</p>

                            <p className={`${dropdownItemStyles} pt-2 mt-2 border-t border-t-gray-100`}>Played</p>
                            <p className={`${dropdownItemStyles} mt-[6px]`}>Playing</p>
                            <p className={`${dropdownItemStyles} mt-[6px]`}>Plan-to-Play</p>
                            <p className={`${dropdownItemStyles} mt-[6px]`}>Wishlist</p>

                            <p className={`${dropdownItemStyles} pt-2 mt-2 border-t border-t-gray-100 w-9/12 text-center`}>Settings</p>
                            <p className={`${dropdownItemStyles} mt-[6px]`}>Sign out</p>
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