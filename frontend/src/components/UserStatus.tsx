/* User status, such as Online, Offline */

interface Size {
    value: string;
    breakpoint?: string; // e.g: sm, md, lg. no breakpoint = default size
}

interface UserStatusProps {
    status: "online" | "offline";
    sizes: Size[];
}

const UserStatus: React.FC<UserStatusProps> = ({ status, sizes }) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`mt-1 size-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"} `}
            ></div>
            <p
                className={`font-lexend ${sizes
                    .map((size) => {
                        return `${size.breakpoint ? size.breakpoint + ":" : ""}text-${size.value}`;
                    })
                    .join(" ")} text-text-primary`}
            >
                {status}
            </p>
        </div>
    );
};

export default UserStatus;
