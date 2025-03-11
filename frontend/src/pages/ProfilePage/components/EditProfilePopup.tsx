import { useRef } from "react";
import { UserAccount } from "../../../api";
import ClosePopupIcon from "../../../components/ClosePopupIcon";
import ProfilePicture from "../../../components/ProfilePicture";

interface EditProfilePopupProps {
    closePopup: () => void;
    user: UserAccount;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
    closePopup,
    user,
}) => {
    const fileInput = useRef<HTMLInputElement>(null);

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
                <div className="flex flex-col items-center">
                    <div
                        className="group relative hover:cursor-pointer"
                        onClick={() => fileInput.current?.click()}
                    >
                        <ProfilePicture
                            sizes={[{ value: 40, borderSize: 3 }]}
                            user={user}
                            link={false}
                        />
                        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full bg-[#0e0e0e99] font-semibold text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            Click to Upload
                        </div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        className="hidden"
                    />
                </div>
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
