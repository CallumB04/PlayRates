import { useParams } from "react-router-dom";
import { useUser } from "../../App";
import { fetchUserByUsername, UserAccount } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProfileError from "./components/ProfileError";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProfilePage = () => {
    const currentUser = useUser(); // getting the currently logged in user
    const { targetUsername } = useParams(); // getting user from URL as their username

    // if no user in the URL, returns error
    if (!targetUsername) {
        return <ProfileError />;
    }

    // fetching user from API using react query
    const {
        data: targetUser,
        error: targetUserError,
        isLoading: targetUserLoading,
    } = useQuery<UserAccount | undefined>({
        queryKey: ["targetUser", targetUsername],
        queryFn: () => fetchUserByUsername(targetUsername),
    });

    // user doesnt exist / failed to fetch
    if (targetUserError) {
        return <ProfileError />;
    }

    // show user that profile is being loaded
    if (targetUserLoading) {
        return (
            <div className="mx-auto mt-24 flex w-max flex-row items-center justify-center gap-6">
                <LoadingSpinner size={8} />
                <p className="font-lexend text-xl tracking-wide text-text-primary">
                    Loading User Profile...
                </p>
            </div>
        );
    }

    if (targetUser) {
        return (
            <h1>
                {currentUser?.id === targetUser.id
                    ? "This is my account: "
                    : ""}
                {targetUser.username}
            </h1>
        );
    }
};

export default ProfilePage;
