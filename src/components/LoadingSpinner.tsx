interface LoadingSpinnerProps {
    size: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => {
    // ensure possible spinner sizes arent purged on deployment
    // size options: size-3 size-4 size-5 size-6 size-7 size-8

    return (
        <div
            className={`size-${size - 1} md:size-${size} animate-spin rounded-full border-2 border-textColor border-t-highlightPurple`}
        ></div>
    );
};

export default LoadingSpinner;
