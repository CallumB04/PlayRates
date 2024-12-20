interface LoadingSpinnerProps {
    size: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({size}) => {
    
    return (
        <div className={`size-${size} border-2 border-textColor 
                       border-t-highlightPurple rounded-full animate-spin`}>
        </div>
    )
}

export default LoadingSpinner;