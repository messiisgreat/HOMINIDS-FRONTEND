import React from 'react';

interface ArrowRightProps {
  className?: string;
  width?: string;
  height?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className, width, height }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.955078 14L26.4109 14M26.4109 14L13.683 26.7279M26.4109 14L13.683 1.27208"
      stroke="white"
      strokeWidth="3"
    />
  </svg>
);

export default ArrowRight;
