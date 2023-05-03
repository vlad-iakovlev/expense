import {
  HTMLMotionProps,
  Variants,
  motion,
  useMotionValue,
} from 'framer-motion'
import { useRouter } from 'next/router.js'
import { forwardRef, useEffect, useMemo, useState } from 'react'

const transition = { ease: 'easeInOut', duration: 0.3 }

export const PageTransition = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(function PageTransition({ children, ...rest }, ref) {
  const router = useRouter()
  const [asPath] = useState(router.asPath)
  const [animation] = useState(router.query.animation)

  useEffect(() => {
    if (router.query.animation) {
      // Update route to prevent animation on refresh or browser back
      void router.replace(router.asPath, undefined, { shallow: true })
    }
  }, [router])

  const y = useMotionValue(0)

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (url !== asPath && !shallow) {
        y.set(-document.documentElement.scrollTop)
        document.documentElement.scrollTop = 0
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [asPath, router.events, y])

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
        transitionEnd: {
          boxShadow: 'none',
        },
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

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="enterTo"
      exit="exitTo"
      transition={transition}
      variants={variants}
      style={{ y }}
      {...rest}
    >
      {children}
    </motion.div>
  )
})
