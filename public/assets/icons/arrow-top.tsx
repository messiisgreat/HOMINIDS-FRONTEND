import React from 'react';

interface ArrowTopProps {
  className?: string;
  width?: string;
  height?: string;
}

const ArrowTop: React.FC<ArrowTopProps> = ({ className, width, height }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9961 28.4561L14.0061 3.00021M14.0061 3.00021L26.729 15.7332M14.0061 3.00021L1.2732 15.7231"
      stroke="#111012"
      strokeWidth="3"
    />
  </svg>
);

export default ArrowTop;
