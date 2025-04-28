import { gamePlatforms } from "../App";

interface GamePlatformProps {
    platform: string;
    textSize: string;
}

const GamePlatform: React.FC<GamePlatformProps> = ({ platform, textSize }) => {
    return (
        <span
            className={`flex items-center gap-${textSize === "xs" ? "1.5" : "2"} rounded-full border-2 border-text-primary px-${textSize === "xs" ? "1.5" : "2.5"} ${textSize !== "xs" && "py-0.5"} ${textSize === "xs" && "h-6"} text-text-primary text-${textSize}`}
        >
            <p>
                {
                    gamePlatforms.find(
                        (gamePlatform) => gamePlatform.name === platform
                    )?.display
                }
            </p>
            <i
                className={
                    gamePlatforms.find(
                        (gamePlatform) => gamePlatform.name === platform
                    )?.icon
                }
            ></i>
        </span>
    );
};

export default GamePlatform;
