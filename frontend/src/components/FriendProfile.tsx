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
            className="group flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-popup-end"
        >
            <ProfilePicture user={user} sizes={[{ value: 12 }]} />
            <p className="font-lexend text-text-primary">{user.username}</p>
        </Link>
    );
};

export default FriendProfile;
