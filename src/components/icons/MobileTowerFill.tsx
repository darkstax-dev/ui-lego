interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

// Simple cellular tower icon (solid fill) to match existing icon component patterns.
const MobileTowerFill: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  className = '',
  fill = '#03053D',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 2H13V6.084C14.884 6.448 16.505 7.586 17.52 9.188L15.85 10.246C15.074 9.023 13.66 8.25 12.062 8.25C10.47 8.25 9.06 9.017 8.283 10.232L6.606 9.186C7.621 7.584 9.242 6.448 11.126 6.084L11 2ZM5.41 11.06C6.852 8.803 9.315 7.25 12.062 7.25C14.817 7.25 17.287 8.81 18.726 11.078L17.052 12.139C15.967 10.43 14.093 9.25 12.062 9.25C10.04 9.25 8.172 10.421 7.085 12.117L5.41 11.06ZM11.07 10.5H13.054L17.88 22H15.69L14.62 19.5H9.5L8.438 22H6.25L11.07 10.5ZM10.338 17.5H13.78L12.06 13.44L10.338 17.5Z"
        fill={fill}
      />
    </svg>
  )
}

export default MobileTowerFill
