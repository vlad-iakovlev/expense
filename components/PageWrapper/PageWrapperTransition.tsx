import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import { useRouter } from 'next/router.js'
import { forwardRef, useEffect, useMemo, useState } from 'react'

const transition = { ease: 'easeInOut', duration: 0.3 }

export const PageWrapperTransition = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(function PageTransition({ children, ...rest }, ref) {
  const router = useRouter()
  const [animation] = useState(router.query.animation)

  const variants = useMemo<Variants>(() => {
    return {
      initial: {
        ...(animation === 'forward' && {
          x: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }),
        ...(animation === 'back' && {
          x: '-25%',
        }),
      },

      enterTo: {
        x: 0,
      },

      exitTo: (animation?: unknown) => ({
        ...(animation === 'forward' && {
          x: '-10%',
        }),
        ...(animation === 'back' && {
          x: '100%',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }),
      }),
    }
  }, [animation])

  useEffect(() => {
    if (router.query.animation) {
      // Update route to prevent animation on refresh or browser back
      void router.replace(router.asPath, undefined, { shallow: true })
    }
  }, [router])

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="enterTo"
      exit="exitTo"
      transition={transition}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  )
})
