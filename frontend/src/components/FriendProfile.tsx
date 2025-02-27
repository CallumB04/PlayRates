import { Link } from "react-router-dom";
import { UserAccount } from "../api";
import ProfilePicture from "./ProfilePicture";

interface FriendProfileProps {
    user: UserAccount;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ user }) => {
    return (
        <Link
            to={`/user/${user.username}`}
            className="group relative flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-popup-end"
        >
            <ProfilePicture user={user} sizes={[{ value: 12 }]} link={false} />
            <p className="font-lexend text-text-primary">{user.username}</p>
            <div
                className={`absolute left-[6px] top-[6px] size-[14px] rounded-full border-2 border-text-dark ${user.online ? "bg-green-500" : "bg-red-500"} `}
                title={user.online ? "Online" : "Offline"}
            ></div>
        </Link>
    );
};

export default FriendProfile;
