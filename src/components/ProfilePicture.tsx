import { UserAccount } from "../api";

interface ProfilePictureProps {
    size: number;
    user: UserAccount;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, user }) => {
    // ensure possible profile picture sizes arent purged on deployment
    // size options: size-8 size-12 size-16 size-20 size-24 size-32 size-40

    return (
        <div className={`profile-picture-wrapper size-${size}`}>
            {user.picture ? (
                <img src={user.picture} className="profile-picture" />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProfilePicture;
