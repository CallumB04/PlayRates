interface MobileSearchPopupProps {
    closePopup: () => void;
    onSearch: () => void;
}

const MobileSearchPopup: React.FC<MobileSearchPopupProps> = ({
    closePopup,
    onSearch,
}) => {
    const handleSearch = () => {
        onSearch();
        closePopup();
    };

    return (
        <dialog className="popup-backdrop" onMouseDown={closePopup}>
            <div
                className="popup popup-default relative flex w-full max-w-[550px] flex-col gap-3 text-center"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <h2 className="text-xl text-text-primary">Search for Game</h2>
                <div className="flex w-full flex-col gap-4 border-t-[1px] border-t-[#cacaca55] pt-3">
                    <input
                        type="text"
                        className="search-bar h-[52px] w-full"
                        placeholder="Search for a game..."
                    />
                    <button className="button-primary w-full">Search</button>
                </div>

                {/* X icon to close popup */}
                <i
                    className="fas fa-xmark hover-text-white absolute right-[14px] top-3 px-1 text-2xl sm:right-5 sm:top-4 sm:text-3xl"
                    onClick={closePopup}
                ></i>
            </div>
        </dialog>
    );
};

export default MobileSearchPopup;
