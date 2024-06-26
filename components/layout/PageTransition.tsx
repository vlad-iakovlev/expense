import { HTMLMotionProps, Variants, easeInOut, motion } from 'framer-motion'
import { useRouter } from 'next/router.js'
import React from 'react'
import { Modify } from '@/types/utility.js'

const transition = { duration: 0.3, ease: easeInOut }

export const PageTransition = React.forwardRef<
  HTMLDivElement,
  Modify<HTMLMotionProps<'div'>, { children: React.ReactNode }>
>(function PageTransition({ children, ...rest }, ref) {
  const router = useRouter()
  const [asPath] = React.useState(router.asPath)
  const [animation] = React.useState(router.query.animation)

  React.useEffect(() => {
    if (router.asPath === asPath && router.query.animation) {
      // Update route to prevent animation on refresh or browser back
      void router.replace(router.asPath, undefined, { shallow: true })
    }
  }, [asPath, router])

  const [marginTop, setMarginTop] = React.useState(0)

  React.useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean },
    ) => {
      if (url !== asPath && !shallow) {
        setMarginTop(-document.documentElement.scrollTop)
        document.documentElement.scrollTo(0, 0)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [asPath, router.events])

  const variants: Variants = React.useMemo(
    () => ({
      initial: {
        ...(animation === 'forward' && {
          transform: 'translateX(100%)',
        }),
        ...(animation === 'back' && {
          transform: 'translateX(-25%)',
          zIndex: -1,
        }),
      },

      enterTo: {
        transform: 'translateX(0%)',
        transitionEnd: {
          zIndex: 'auto',
        },
      },

      exitTo: (animation?: unknown) => ({
        ...(animation === 'forward' && {
          transform: 'translateX(-10%)',
        }),
        ...(animation === 'back' && {
          transform: 'translateX(100%)',
        }),
      }),
    }),
    [animation],
  )

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
