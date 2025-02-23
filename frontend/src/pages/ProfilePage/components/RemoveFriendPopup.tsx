interface RemoveFriendPopupProps {
    closePopup: () => void;
    confirmRemove: () => Promise<void>;
    friendName: string;
}

const RemoveFriendPopup: React.FC<RemoveFriendPopupProps> = ({
    closePopup,
    confirmRemove,
    friendName,
}) => {
    // confirm friend removal and close popup
    const handleConfirm = () => {
        confirmRemove();
        closePopup();
    };

    return (
        <dialog className="popup-backdrop" onMouseDown={closePopup}>
            <div
                className="popup popup-default flex flex-col gap-6 text-center"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="flex w-full flex-col gap-3">
                    <h2 className="text-xl text-text-primary">Remove Friend</h2>
                    <p className="max-w-[40ch] border-t-[1px] border-t-[#cacaca55] pt-3 font-light text-text-secondary">
                        Are you sure you want to remove{" "}
                        <span className="font-normal text-text-primary">
                            {friendName}
                        </span>{" "}
                        as your friend? This cannot be undone.
                    </p>
                </div>
                <div className="flex w-full justify-center gap-5">
                    <button
                        className="button-primary w-1/2"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="button-outline button-outline-cancel w-1/2"
                        onClick={closePopup}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default RemoveFriendPopup;
