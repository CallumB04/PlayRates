import { Link } from "react-router-dom";

// Displayed if no target user in URL or failed to fetch user from API
const ProfileError = () => {
    return (
        <div className="mx-auto mt-6 flex w-max flex-col items-center gap-y-5">
            <h1 className="font-lexend text-xl text-text-primary">
                There was an error when fetching this user...
            </h1>
            <Link to="/">
                <p className="button-primary w-max">Return to home page</p>
            </Link>
        </div>
    );
};

export default ProfileError;
