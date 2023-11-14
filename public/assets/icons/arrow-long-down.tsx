import React from 'react';

interface ArrowLongDownProps {
  className?: string;
  width?: string;
  height?: string;
}

const ArrowLongDown: React.FC<ArrowLongDownProps> = ({ className, width, height }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0039 0.456055L13.9939 25.9119M13.9939 25.9119L1.27096 13.1789M13.9939 25.9119L26.7268 13.189"
      stroke="#111012"
      strokeWidth="3"
    />
  </svg>
);

export default ArrowLongDown;
