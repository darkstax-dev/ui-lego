import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const FiletypeMp4: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#03053D' 
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 4.89543 2.89543 4 4 4H17.4142L22 8.58579V18C22 19.1046 21.1046 20 20 20H19V18H20V10H16V6H4V13H2V6ZM2 20H2.93209V16.6182H2.95981L4.31116 20H4.96951L6.31739 16.6182H6.34858V20H7.28067V15H6.07138L4.65073 18.5932H4.62994L3.20929 15H2V20ZM8.11227 20H9.1587V18.4234H10.122C11.1753 18.4234 11.8787 17.7443 11.8787 16.7152V16.7082C11.8787 15.6791 11.1753 15 10.122 15H8.11227V20ZM9.86556 15.8281C10.465 15.8281 10.8184 16.1435 10.8184 16.7117V16.7186C10.8184 17.2869 10.465 17.6057 9.86556 17.6057H9.1587V15.8281H9.86556ZM15.7595 20H14.7651V19.0818H12.2772V18.2086L14.2834 15H15.7595V18.2467H16.4179V19.0818H15.7595V20ZM13.1885 18.2467V18.2744H14.7859V15.7554H14.7616L13.1885 18.2467Z"
        fill={fill}
      />
    </svg>
  )
}

export default FiletypeMp4
