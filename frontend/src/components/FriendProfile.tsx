import { Link } from "react-router-dom";
import { UserAccount } from "../api";
import ProfilePicture from "./ProfilePicture";

interface FriendProfileProps {
    user: UserAccount;
    closePopup?: () => void; // optional prop if friend profile is within a popup
    profilePictureSize: number;
}

const FriendProfile: React.FC<FriendProfileProps> = ({
    user,
    closePopup,
    profilePictureSize,
}) => {
    return (
        <Link
            to={`/user/${user.username}`}
            className={`group relative flex w-full items-center ${profilePictureSize >= 12 ? "gap-3" : "gap-2"} rounded-md px-2 py-1 transition-colors duration-200 hover:bg-popup-end`}
            onClick={closePopup}
        >
            <ProfilePicture
                user={user}
                sizes={[{ value: profilePictureSize, borderSize: 2 }]}
                link={false}
            />
            <p
                className={`font-lexend text-text-primary ${profilePictureSize >= 12 ? "text-lg" : "text-base"}`}
            >
                {user.username}
            </p>
            <div
                className={`absolute left-[6px] top-[6px] size-[14px] rounded-full border-[1.5px] border-text-dark ${user.online ? "bg-green-500" : "bg-red-500"} `}
                title={user.online ? "Online" : "Offline"}
            ></div>
        </Link>
    );
};

export default FriendProfile;
