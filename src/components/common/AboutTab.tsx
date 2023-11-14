import React from 'react';
import ArrowTop from 'public/assets/icons/arrow-top';
import ArrowLongDown from 'public/assets/icons/arrow-long-down';

interface AboutTabProps {
  id: number;
  title: string;
  description: string;
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
}

const AboutTab: React.FC<AboutTabProps> = ({
  id,
  title,
  description,
  isSelected,
  setIsSelected,
}) => {
  const handleClick = () => {
    if (isSelected === title) {
      setIsSelected('');
    } else {
      setIsSelected(title);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 nato-fontfamily font-bold" style={{lineHeight: "41.76px",  fontSize: "36px"}}>
          <div>0{id + 1}</div>
          <div>{title}</div>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full p-3"
          style={{ backgroundColor: '#ffffff' }}
          onClick={() => handleClick()}
        >
          {isSelected === title ? (
            <ArrowTop width="18" height="18" />
          ) : (
            <ArrowLongDown width="18" height="18" />
          )}
        </div>
      </div>
      {isSelected === title && (
        <div className="mt-5 text-2xl" style={{ transitionDuration: '2000ms', marginLeft: "68px", lineHeight: "19px" }}>
          {description}
        </div>
      )}
    </div>
  );
};

export default AboutTab;
