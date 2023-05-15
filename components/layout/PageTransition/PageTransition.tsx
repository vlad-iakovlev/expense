import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import { useRouter } from 'next/router.js'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { Modify } from '../../../types/utility.ts'

const transition = { ease: 'easeInOut', duration: 0.3 }

export const PageTransition = forwardRef<
  HTMLDivElement,
  Modify<HTMLMotionProps<'div'>, { children: React.ReactNode }>
>(function PageTransition({ children, ...rest }, ref) {
  const router = useRouter()
  const [asPath] = useState(router.asPath)
  const [animation] = useState(router.query.animation)

  useEffect(() => {
    if (router.asPath === asPath && router.query.animation) {
      // Update route to prevent animation on refresh or browser back
      void router.replace(router.asPath, undefined, { shallow: true })
    }
  }, [asPath, router])

  const [marginTop, setMarginTop] = useState(0)

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (url !== asPath && !shallow) {
        setMarginTop(-document.documentElement.scrollTop)
        document.documentElement.scrollTo(0, 0)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [asPath, router.events])

  const variants: Variants = useMemo(() => {
    return {
      initial: {
        ...(animation === 'forward' && {
          transform: 'translateX(100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }),
        ...(animation === 'back' && {
          transform: 'translateX(-25%)',
          zIndex: -1,
        }),
      },

      enterTo: {
        transform: 'translateX(0%)',
        transitionEnd: {
          boxShadow: 'none',
          zIndex: 'auto',
        },
      },

      exitTo: (animation?: unknown) => ({
        ...(animation === 'forward' && {
          transform: 'translateX(-10%)',
        }),
        ...(animation === 'back' && {
          transform: 'translateX(100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }),
      }),
    }
  }, [animation])

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col"
      initial="initial"
      animate="enterTo"
      exit="exitTo"
      transition={transition}
      variants={variants}
      {...rest}
    >
      <div style={{ marginTop }}>{children}</div>
    </motion.div>
  )
})
