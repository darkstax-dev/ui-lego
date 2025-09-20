import React from 'react'
import './FeaturedIcon.css'

export type FeaturedIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type FeaturedIconColor = 'error' | 'warning' | 'success'

interface FeaturedIconProps {
  size?: FeaturedIconSize
  color?: FeaturedIconColor
  className?: string
}

const FeaturedIcon: React.FC<FeaturedIconProps> = ({
  size = 'sm',
  color = 'warning',
  className = ''
}) => {
  const iconSize = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  }[size]

  const classes = `featured-icon featured-icon--${size} featured-icon--${color} ${className}`.trim()

  return (
    <div className={classes}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox={`0 0 ${iconSize} ${iconSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="featured-icon__svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={size === 'xs' ?
            "M6.25 1.5C5.55964 1.5 5 2.05964 5 2.75C5 3.44036 5.55964 4 6.25 4C6.94036 4 7.5 3.44036 7.5 2.75C7.5 2.05964 6.94036 1.5 6.25 1.5ZM4.5 5L4 6.5H5.75L4.9875 8.53333C4.63066 9.48492 5.33411 10.5 6.3504 10.5C6.90174 10.5 7.40575 10.1885 7.65231 9.69538L8 9H6.5L8 5H4.5Z" :
            size === 'sm' ?
            "M8.33331 2C7.41284 2 6.66665 2.74619 6.66665 3.66667C6.66665 4.58714 7.41284 5.33333 8.33331 5.33333C9.25379 5.33333 9.99998 4.58714 9.99998 3.66667C9.99998 2.74619 9.25379 2 8.33331 2ZM5.99998 6.66667L5.33331 8.66667H7.66665L6.64998 11.3778C6.17419 12.6466 7.11212 14 8.46718 14C9.20229 14 9.87431 13.5847 10.2031 12.9272L10.6666 12H8.66665L10.6666 6.66667H5.99998Z" :
            size === 'md' ?
            "M10.4167 2.5C9.26606 2.5 8.33332 3.43274 8.33332 4.58333C8.33332 5.73393 9.26606 6.66667 10.4167 6.66667C11.5672 6.66667 12.5 5.73393 12.5 4.58333C12.5 3.43274 11.5672 2.5 10.4167 2.5ZM7.49999 8.33333L6.66666 10.8333H9.58332L8.31249 14.2222C7.71775 15.8082 8.89017 17.5 10.584 17.5C11.5029 17.5 12.3429 16.9808 12.7538 16.159L13.3333 15H10.8333L13.3333 8.33333H7.49999Z" :
            size === 'lg' ?
            "M12.5 3C11.1193 3 10 4.11929 10 5.5C10 6.88071 11.1193 8 12.5 8C13.8807 8 15 6.88071 15 5.5C15 4.11929 13.8807 3 12.5 3ZM9 10L8 13H11.5L9.975 17.0667C9.26131 18.9698 10.6682 21 12.7008 21C13.8035 21 14.8115 20.377 15.3046 19.3908L16 18H13L16 10H9Z" :
            "M14.5833 3.5C12.9725 3.5 11.6666 4.80584 11.6666 6.41667C11.6666 8.0275 12.9725 9.33333 14.5833 9.33333C16.1941 9.33333 17.5 8.0275 17.5 6.41667C17.5 4.80584 16.1941 3.5 14.5833 3.5ZM10.5 11.6667L9.33331 15.1667H13.4166L11.6375 19.9111C10.8048 22.1315 12.4462 24.5 14.8176 24.5C16.104 24.5 17.2801 23.7732 17.8554 22.6225L18.6666 21H15.1666L18.6666 11.6667H10.5Z"
          }
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export default FeaturedIcon
