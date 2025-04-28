import { Link } from "react-router-dom";

interface Size {
    value: number;
    borderSize: number; // in pixels
    breakpoint?: string; // e.g: sm, md, lg. no breakpoint = default size
}

interface ProfilePictureProps {
    sizes: Size[];
    file: string;
    username: string;
    link: boolean; // is clickable for navigation? allows for preventing nested <a> elements
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
    sizes,
    file,
    username,
    link,
}) => {
    return link ? (
        <Link
            to={`/user/${username}`}
            className={`profile-picture-wrapper border-text-dark ${sizes
                .map((size) => {
                    return `${size.breakpoint ? size.breakpoint + ":" : ""}size-${size.value} ${size.breakpoint ? size.breakpoint + ":" : ""}border-[${size.borderSize}px]`;
                })
                .join(" ")}`}
        >
            {file ? <img src={file} className="profile-picture" /> : <></>}
        </Link>
    ) : (
        <div
            className={`profile-picture-wrapper border-text-dark ${sizes
                .map((size) => {
                    return `${size.breakpoint ? size.breakpoint + ":" : ""}size-${size.value} ${size.breakpoint ? size.breakpoint + ":" : ""}border-[${size.borderSize}px]`;
                })
                .join(" ")}`}
        >
            {file ? <img src={file} className="profile-picture" /> : <></>}
        </div>
    );
};

export default ProfilePicture;
