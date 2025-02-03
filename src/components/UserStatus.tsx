/* User status, such as Online, Offline */

interface UserStatusProps {
    status: "online" | "offline";
}

const UserStatus: React.FC<UserStatusProps> = ({ status }) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`mt-1 size-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"} `}
            ></div>
            <p className="font-lexend text-lg text-text-primary">{status}</p>
        </div>
    );
};

export default UserStatus;
