import { useState } from "react";

const Image = ({ imageUrl, defaultImageUrl, altText = "", className = "" }) => {
  const [src, setSrc] = useState(imageUrl || defaultImageUrl);
  return (
    <img
      className={className}
      src={src}
      alt={altText}
      onError={() => setSrc(defaultImageUrl)}
    />
  );
};

export default Image;
