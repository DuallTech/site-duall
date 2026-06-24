import type { Variants } from 'motion/react';

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const heroImageVariants: Variants = {
  enter: { opacity: 0, scale: 1.12 },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 1.5, ease: 'easeInOut' },
      scale: { duration: 6.5, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
};
