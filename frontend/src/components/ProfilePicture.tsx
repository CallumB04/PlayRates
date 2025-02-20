import { Link } from "react-router-dom";
import { UserAccount } from "../api";

interface Size {
    value: number;
    breakpoint?: string; // e.g: sm, md, lg. no breakpoint = default size
}

interface ProfilePictureProps {
    sizes: Size[];
    user: UserAccount;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ sizes, user }) => {
    return (
        <Link
            to={`/user/${user.username}`}
            className={`profile-picture-wrapper ${sizes
                .map((size) => {
                    return `${size.breakpoint ? size.breakpoint + ":" : ""}size-${size.value}`;
                })
                .join(" ")}`}
        >
            {user.picture ? (
                <img src={user.picture} className="profile-picture" />
            ) : (
                <></>
            )}
        </Link>
    );
};

export default ProfilePicture;
