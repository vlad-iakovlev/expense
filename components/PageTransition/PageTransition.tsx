import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import { forwardRef } from 'react'

const transition = { ease: 'easeInOut', duration: 0.3 }

const variants: Variants = {
  initial: () => {
    return {
      x: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      transition,
      position: 'absolute',
      inset: 0,
    }
  },

  enter: () => {
    return {
      x: 0,
      transition,
      transitionEnd: {
        position: 'static',
      },
      position: 'absolute',
      inset: 0,
    }
  },

  exit: () => {
    return {
      x: '-10%',
      zIndex: -1,
      transition,
    }
  },
}

export const PageTransition = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(function PageTransition({ children, ...rest }, ref) {
  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  )
})
