import React from 'react';

interface ArrowLeftProps {
  className?: string;
  width?: string;
  height?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ className, width, height }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.9551 13.9998L2.49923 13.9998M2.49923 13.9998L15.2272 1.27184M2.49923 13.9998L15.2272 26.7277"
      stroke="#AF50BD"
      stroke-opacity="0.4"
      strokeWidth="3"
    />
  </svg>
);

export default ArrowLeft;
