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
        <p
            className={`text-text-primary ${typeToColor(type)} notification-fadeout fixed left-1/2 top-20 z-50 mx-auto h-max -translate-x-1/2 rounded-md px-4 py-2 font-lexend text-lg`}
        >
            <span className="font-semibold uppercase">{type}: </span>
            {text}
        </p>
    );
};

export default Notification;
