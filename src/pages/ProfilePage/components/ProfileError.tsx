// Displayed if no target user in URL or failed to fetch user from API
const ProfileError = () => {
    return (
        <h1 className="mt-6 font-lexend text-text-primary">
            There was an error when fetching this user
        </h1>
    );
};

export default ProfileError;
