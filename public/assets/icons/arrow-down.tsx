import React from 'react';

interface ArrowDownProps {
  className?: string;
  width?: string;
  height?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({ className, width, height }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 12 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1L9.25269 2.76297C7.85925 4.1689 7.16253 4.87187 6.31333 4.98011C6.10527 5.00663 5.89473 5.00663 5.68667 4.98011C4.83748 4.87187 4.14075 4.1689 2.74731 2.76297L1 1"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
    />
  </svg>
);

export default ArrowDown;
