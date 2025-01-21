interface NotificationProps {
    text: string;
    type: "success" | "error" | "loading";
}

// function to return tailwind css color to match the notification type
const typeToColor = (type: string) => {
    switch (type) {
        case "success":
            return "bg-green-500";
        case "error":
            return "bg-red-500";
        case "loading":
            return "bg-highlight-primary";
    }
};

const Notification: React.FC<NotificationProps> = ({ text, type }) => {
    return (
        <div className="fixed left-0 top-0 flex h-screen w-screen justify-center pt-20">
            <p
                className={`text-text-primary ${typeToColor(type)} notification-fadeout z-50 mx-auto h-max rounded-md px-4 py-2 font-lexend text-lg`}
            >
                <span className="font-semibold uppercase">{type}: </span>
                {text}
            </p>
        </div>
    );
};

export default Notification;
