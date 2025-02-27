interface ClosePopupIconProps {
    onClick: () => void;
}

const ClosePopupIcon: React.FC<ClosePopupIconProps> = ({ onClick }) => {
    return (
        <i
            className="fas fa-xmark hover-text-white absolute right-[14px] top-3 px-1 text-2xl"
            onClick={onClick}
        ></i>
    );
};

export default ClosePopupIcon;
