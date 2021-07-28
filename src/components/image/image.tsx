import React from 'react';
import { Img } from 'react-image';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { styles } from 'styled-system';
const Placeholder = () => <img src="/images/placeholder-lg.png" alt="product img loader" />;
export default function Image({
  url,
  alt = 'placeholder',
  unloader,
  loader,
  className,
  style,
}: {
  url: string | [string];
  alt: string;
  unloader?: string;
  loader?: string;
  className?: string;
  style?: any;
}) {
  return (
    // <Img
    //   draggable={false}
    //   style={style}
    //   src={url}
    //   alt={alt}
    //   loader={<Placeholder />}
    //   unloader={<Placeholder />}
    //   className={className}
    // />
    <LazyLoadImage
      alt={alt}
      src={url}
      width={200}
      height={200} 
      style={style}
      className={className}
      effect="blur"
      placeholder={<Placeholder />}
      />
  );
}
