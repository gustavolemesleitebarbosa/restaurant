import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';


const Shimmer = () => {
  const shimmerStyle = {
    width: '63%',
    height: '63%',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(-45deg, #fff 25%, #f0f0f0 25%, #f0f0f0 50%, #fff 50%, #fff 75%, #f0f0f0 75%, #f0f0f0 100%)',
    backgroundSize: '400% 400%',
    animation: 'shimmer 0.3s ease-in-out infinite'
  };

  return (
    <img style={shimmerStyle}></img>
  );
};

const PlaceholderImage = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      setShimmer(false);
    };
  }, [src]);

  return (
    <>
      { (!imageLoaded|| shimmer)&& <Shimmer />}
      <NextImage style ={{ objectFit:"fit"}} src={src} fill alt="" />
    </>
  );
};

export default PlaceholderImage;