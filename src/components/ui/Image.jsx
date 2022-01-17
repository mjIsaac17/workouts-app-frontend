import { useEffect, useState } from "react";

const Image = ({ imageUrl, defaultImageUrl, altText = "", className = "" }) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(imageUrl || defaultImageUrl);
  }, [setSrc, imageUrl, defaultImageUrl]);

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
