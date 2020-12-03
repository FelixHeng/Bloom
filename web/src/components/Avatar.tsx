import React from "react";
import { Image } from "cloudinary-react";

interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = ({}) => {
  return (
    <div>
      <Image
        style={{ width: 100 }}
        cloudName="felixh"
        publicId="dbndybfi9j7kygmlakue"
      />
    </div>
  );
};
