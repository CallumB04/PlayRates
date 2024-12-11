function Navbar() {

    return (
        <nav className="absolute top-0 left-0 w-screen h-16 px-24 bg-transparent flex justify-between items-center">
            <h2 className="font-semibold font-ssp text-3xl tracking-wide">PlayRates</h2>
            <div className="font-ssp h-full flex gap-7 items-center">
                <p>Browse Games</p>
                <input type="text" placeholder="Search for game..."/>
                <p>My Account</p>
            </div>
        </nav>
    );
}

export default Navbar;