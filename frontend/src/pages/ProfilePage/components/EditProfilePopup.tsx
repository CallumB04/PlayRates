import { UserAccount } from "../../../api";
import ClosePopupIcon from "../../../components/ClosePopupIcon";

interface EditProfilePopupProps {
    closePopup: () => void;
    user: UserAccount;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
    closePopup,
    user,
}) => {
    const handleSave = () => {
        console.log("Saved");
        closePopup();
    };

    return (
        <dialog className="popup-backdrop" onMouseDown={closePopup}>
            <div
                className="popup popup-default flex w-[550px] flex-col gap-6 text-center"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="flex w-full flex-col gap-3">
                    <h2 className="text-xl text-text-primary">Edit Profile</h2>
                    <p className="border-t-[1px] border-t-[#cacaca55] pt-3 font-light text-text-secondary">
                        Update your public profile and how others see you!
                    </p>
                </div>
                <div>{/* TODO: Build out input form*/}</div>
                <div className="flex w-full flex-col justify-center gap-5 sm:flex-row">
                    <button
                        className="button-primary w-full sm:w-1/2"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="button-outline button-outline-default w-full sm:w-1/2"
                        onClick={closePopup}
                    >
                        Cancel
                    </button>
                </div>

                <ClosePopupIcon onClick={closePopup} />
            </div>
        </dialog>
    );
};

export default EditProfilePopup;
