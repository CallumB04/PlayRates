import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="absolute top-0 left-0 z-50 w-screen h-16 px-24 bg-transparent flex justify-between items-center">
            <h2 className="font-semibold font-ssp text-gray-100 text-3xl tracking-wide">PlayRates</h2>
            <div className="font-ssp font-normal text-gray-100 h-full flex gap-4 items-center">
                <Link to="/account">
                    <p className="p-2 transition duration-50 hover:cursor-pointer hover:text-purple-600">
                        My Account
                    </p>
                </Link>
                <Link to="/library">
                    <p className="p-2 transition duration-50 hover:cursor-pointer hover:text-purple-600">
                        Browse Games
                    </p>
                </Link>
                <input 
                    type="text" 
                    placeholder="Search for game..."
                    className="w-60 px-2 py-1.5 bg-neutral-700 rounded"
                />
            </div>
        </nav>
    );
}

export default Navbar;