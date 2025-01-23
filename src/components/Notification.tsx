interface NotificationProps {
    text: string;
    type: "success" | "error";
}

// function to return text color, bg color and icon to match the notification type
const typeToValues = (
    type: string
): { textColor: string; bgColor: string; iconName: string } | undefined => {
    switch (type) {
        case "success":
            return {
                textColor: "text-green-500",
                bgColor: "bg-green-100",
                iconName: "circle-check",
            };
        case "error":
            return {
                textColor: "text-red-500",
                bgColor: "bg-red-100",
                iconName: "circle-xmark",
            };
    }
};

const Notification: React.FC<NotificationProps> = ({ text, type }) => {
    const { textColor, bgColor, iconName } = typeToValues(type)!;

    return (
        <p
            className={`${textColor} ${bgColor} notification-fadeout fixed left-1/2 top-20 z-50 mx-auto flex h-max w-max -translate-x-1/2 flex-row items-center gap-x-2 rounded-md px-4 py-2 font-lexend text-lg`}
        >
            <i className={`fa-regular fa-${iconName}`}></i>
            <p>{text}</p>
        </p>
    );
};

export default Notification;
