import { useParams } from "react-router-dom";
import { useUser } from "../../App";
import { fetchUserByUsername, UserAccount } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProfileError from "./components/ProfileError";
import LoadingSpinner from "../../components/LoadingSpinner";

interface ProfilePageProps {
    runNotification: (text: string, type: "success" | "error") => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ runNotification }) => {
    const currentUser = useUser(); // getting the currently logged in user
    const { targetUsername } = useParams(); // getting user from URL as their username

    // if no user in the URL, returns error
    if (!targetUsername) {
        runNotification("No user found in URL", "error");
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
        runNotification("Failed to fetch user data", "error");
        return <ProfileError />;
    }

    // show user that profile is being loaded
    if (targetUserLoading) {
        return (
            <div className="absolute left-0 top-0 flex h-[calc(100vh-64px)] w-screen items-center justify-center">
                <div className="mx-auto flex h-full w-max flex-row items-center justify-center gap-6">
                    <LoadingSpinner size={8} />
                    <p className="font-lexend text-xl tracking-wide text-text-primary">
                        Loading User Profile...
                    </p>
                </div>
            </div>
        );
    }

    // successful user profile load
    if (targetUser) {
        return (
            <div className="flex w-full flex-col gap-5 overflow-hidden lg:flex-row">
                {/* Profile card */}
                <div className="card w-full lg:w-1/3 xl:w-1/4 2xl:w-1/5"></div>
                {/* Games card */}
                <div className="card w-full lg:w-2/3 xl:w-3/4 2xl:w-3/5"></div>
                {/* Friends / Socials */}
                <div className="hidden w-1/5 flex-col gap-5 2xl:flex">
                    <div className="card w-full"></div>
                    <div className="card w-full"></div>
                </div>
            </div>
        );
    }
};

export default ProfilePage;
