import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="absolute top-0 left-0 z-50 w-screen h-16 md:px-6 xl:px-16 bg-[#232323] 
                        flex justify-center md:justify-between items-center">
            <h2 className="font-semibold font-ssp text-gray-100 text-4xl tracking-wide">PlayRates</h2>
            <div className="hidden md:flex font-ssp font-normal text-gray-100 h-full gap-4 items-center">
                <Link to="/account">
                    <span className="relative group flex gap-1 items-center p-2 hover:cursor-pointer">
                        <p className="group-hover:text-purple-600 transition duration-75">My Account</p>
                        <i className="fa fa-chevron-down text-sm group-hover:text-purple-600 transition duration-75"></i>

                        <div className="absolute hidden hover:block hover:cursor-default group-hover:block mx-auto w-72 h-52 top-10 pt-3">
                            <div className="w-full h-full bg-neutral-700 rounded-b-md">

                            </div>
                        </div>
                    </span>
                </Link>
                <Link to="/library">
                    <p className="block p-2 transition duration-75 hover:cursor-pointer hover:text-purple-600">
                        Browse Games
                    </p>
                </Link>
                <input 
                    type="text" 
                    placeholder="Search for game..."
                    className="block w-60 px-2 py-1.5 bg-neutral-700 rounded focus:outline-none"
                />
            </div>            
        </nav>
    );
}

export default Navbar;