import React from 'react'

interface IconProps {
  width?: number
  height?: number
  className?: string
  fill?: string
}

const KubernetesMultus: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  fill = '#072B56' 
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
        d="M4.94019 13.6314L11.5303 19.8873L12.6203 18.7839L6.3002 12.8926L4.94019 13.6314Z" 
        fill={fill}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M12.57 4.38184L11.48 5.49485L17.6901 11.4629L19.4701 11.0983L12.57 4.38184Z" 
        fill={fill}
      />
      <path 
        d="M12.6306 5.4082H11.3806V10.2057H12.6306V5.4082Z" 
        fill={fill}
      />
      <path 
        d="M12.6306 14.3984H11.3806V19.1959H12.6306V14.3984Z" 
        fill={fill}
      />
      <path 
        d="M12.0001 6.6077C13.0385 6.6077 13.8802 5.80009 13.8802 4.80385C13.8802 3.80761 13.0385 3 12.0001 3C10.9618 3 10.1201 3.80761 10.1201 4.80385C10.1201 5.80009 10.9618 6.6077 12.0001 6.6077Z" 
        fill={fill}
      />
      <path 
        d="M12.0001 21.0003C13.0385 21.0003 13.8802 20.1927 13.8802 19.1964C13.8802 18.2002 13.0385 17.3926 12.0001 17.3926C10.9618 17.3926 10.1201 18.2002 10.1201 19.1964C10.1201 20.1927 10.9618 21.0003 12.0001 21.0003Z" 
        fill={fill}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M2.65991 11.4053H17.7301L21.3702 13.1995H6.29996L2.65991 11.4053Z" 
        fill={fill}
      />
      <path 
        d="M4.50003 14.6959C5.88076 14.6959 7.00007 13.622 7.00007 12.2972C7.00007 10.9724 5.88076 9.89844 4.50003 9.89844C3.1193 9.89844 2 10.9724 2 12.2972C2 13.622 3.1193 14.6959 4.50003 14.6959Z" 
        fill={fill}
      />
      <path 
        d="M19.5 14.6959C20.8808 14.6959 22.0001 13.622 22.0001 12.2972C22.0001 10.9724 20.8808 9.89844 19.5 9.89844C18.1193 9.89844 17 10.9724 17 12.2972C17 13.622 18.1193 14.6959 19.5 14.6959Z" 
        fill={fill}
      />
    </svg>
  )
}

export default KubernetesMultus
