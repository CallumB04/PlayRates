import { Link } from "react-router-dom";
import { useUser } from "../../../App";

// Displayed if no target user in URL or failed to fetch user from API
const ProfileError = () => {
    const user = useUser();

    return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-y-5 px-4">
            <h1 className="text-center font-lexend text-xl text-text-primary">
                There was an error when fetching this user...
            </h1>
            <div className="flex w-full flex-col items-center gap-3 sm:w-max sm:flex-row">
                <Link to="/" className="button-primary w-full sm:w-max">
                    Return to home page
                </Link>
                {user ? (
                    <Link
                        to={`/user/${user.username}`}
                        className="button-secondary w-full sm:w-max"
                    >
                        Go to Profile
                    </Link>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ProfileError;
