const socialsStyles = `hover:text-highlightPurple hover:cursor-pointer transition-colors duration-[200ms]`;

const Footer = () => {

    return (
        <footer className="bg-navbarColor w-full h-72 md:h-36 text-[#cacaca] relative font-ssp">
            {/* Socials */}
            <div className="w-full mx-auto flex justify-center gap-8 lg:gap-12 items-center text-[33px] md:text-3xl pt-12 md:pt-8">
                <i className={`fab fa-twitter ${socialsStyles}`}></i>
                <i className={`fab fa-instagram ${socialsStyles}`}></i>
                <i className={`fab fa-facebook ${socialsStyles}`}></i>
                <i className={`fab fa-discord ${socialsStyles}`}></i>
            </div>
            {/* Footer text wrapper */}
            <div className="absolute bottom-8 md:bottom-4 w-full flex flex-wrap justify-between text-center px-6 gap-y-[22px] text-[17px] font-light">
                <p className="w-full md:w-1/3 md:text-left">Created by <span className="font-normal">Callum Burgoyne</span></p>
                <p className="w-max mx-auto p-3 px-4 md:p-1 hover:cursor-pointer md:hover:text-highlightPurple transition-colors duration-[200ms]
                              bg-highlightPurple hover:bg-purple-500 md:hover:bg-transparent md:bg-transparent rounded-md font-semibold"
                   onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
                    Back to Top
                </p>
                <p className="w-full md:w-1/3 md:text-right">© 2024 PlayRates</p>
            </div>
        </footer>
    );
};

export default Footer;