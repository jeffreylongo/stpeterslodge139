import React from 'react';
import lodgeEmblemImage from "@assets/1000.png";

const LodgeEmblem: React.FC = () => {
  return (
    <img 
      src={lodgeEmblemImage} 
      alt="St. Petersburg Lodge No. 139 Emblem" 
      className="w-full h-full object-contain"
    />
  );
};

export default LodgeEmblem;
