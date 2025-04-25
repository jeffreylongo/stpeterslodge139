import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  width?: number | string;
  height?: number | string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    // Create a new image object to preload
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // You could set a fallback image here if needed
    };
    
    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return (
    <>
      {!isLoaded && (
        <div 
          className={`bg-gray-200 animate-pulse ${placeholderClassName || className}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      )}
    </>
  );
};

export default LazyImage;