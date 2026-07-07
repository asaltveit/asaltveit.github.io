import { StaticImageData } from 'next/image';

export function getCardImageSources(image: StaticImageData | string): {
  src: string;
  srcSet?: string;
} {
  if (typeof image !== 'string') {
    return { src: image.src };
  }

  const base = image.replace(/\.[^.]+$/, '');
  return {
    src: `${base}-800w.webp`,
    srcSet: `${base}-400w.webp 400w, ${base}-800w.webp 800w`,
  };
}
