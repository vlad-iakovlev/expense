import { clsx } from 'clsx'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Thumb, Track, getThumb, getTrack } from './utils.ts'

const DEFAULT_TRACK: Track = {
  startOffset: 0,
  endOffset: 0,
  edgeOffset: 0,
  thickness: 0,
  length: 0,
}

const DEFAULT_THUMB: Thumb = { offset: 0, length: 0 }

export interface ScrollableProps {
  className?: string
  contentClassName?: string
  theme?: 'light' | 'dark'
  children: ReactNode
}

export const Scrollable: FC<ScrollableProps> = ({
  className,
  contentClassName,
  theme = 'light',
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isVTrackVisible, setIsVTrackVisible] = useState(false)
  const [isHTrackVisible, setIsHTrackVisible] = useState(false)
  const [vTrack, setVTrack] = useState(DEFAULT_TRACK)
  const [hTrack, setHTrack] = useState(DEFAULT_TRACK)
  const [vThumb, setVThumb] = useState(DEFAULT_THUMB)
  const [hThumb, setHThumb] = useState(DEFAULT_THUMB)

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    const handleScroll = () => {
      const needVTrack = contentEl.scrollHeight > contentEl.clientHeight
      const needHTrack = contentEl.scrollWidth > contentEl.clientWidth
      const isBothVisible = needVTrack && needHTrack

      const vTrack = getTrack({
        container: contentEl.clientHeight,
        isBothVisible,
      })

      const hTrack = getTrack({
        container: contentEl.clientWidth,
        isBothVisible,
      })

      const vThumb = getThumb({
        container: contentEl.clientHeight,
        content: contentEl.scrollHeight,
        scrolled: contentEl.scrollTop,
        trackLength: vTrack.length,
      })

      const hThumb = getThumb({
        container: contentEl.clientWidth,
        content: contentEl.scrollWidth,
        scrolled: contentEl.scrollLeft,
        trackLength: hTrack.length,
      })

      setIsVTrackVisible(needVTrack)
      setIsHTrackVisible(needHTrack)
      setVTrack(vTrack)
      setHTrack(hTrack)
      setVThumb(vThumb)
      setHThumb(hThumb)
    }

    contentEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => contentEl.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isVTrackVisible || isHTrackVisible) {
      const timerId = setTimeout(() => {
        setIsVTrackVisible(false)
        setIsHTrackVisible(false)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [isVTrackVisible, isHTrackVisible, vTrack, hTrack, vThumb, hThumb])

  const tracks = useMemo<ReactNode[]>(() => {
    const trackProps: HTMLMotionProps<'div'> = {
      className: 'absolute pointer-events-none',
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: { ease: 'easeOut', duration: 0.075 },
      },
      exit: {
        opacity: 0,
        transition: { ease: 'easeIn', duration: 0.2 },
      },
    }

    const thumbClassName = clsx('absolute rounded-full', {
      'bg-black bg-opacity-[0.35]': theme === 'light',
      'bg-white bg-opacity-50': theme === 'dark',
    })

    const tracks: ReactNode[] = []

    if (isVTrackVisible) {
      tracks.push(
        <motion.div
          {...trackProps}
          key="v-track"
          style={{
            top: vTrack.startOffset,
            bottom: vTrack.endOffset,
            right: vTrack.edgeOffset,
            width: vTrack.thickness,
          }}
        >
          <div
            className={clsx(thumbClassName, 'w-full')}
            style={{ top: vThumb.offset, height: vThumb.length }}
          />
        </motion.div>
      )
    }

    if (isHTrackVisible) {
      tracks.push(
        <motion.div
          {...trackProps}
          key="h-track"
          style={{
            left: hTrack.startOffset,
            right: hTrack.endOffset,
            bottom: hTrack.edgeOffset,
            height: hTrack.thickness,
          }}
        >
          <div
            className={clsx(thumbClassName, 'h-full')}
            style={{ left: hThumb.offset, width: hThumb.length }}
          />
        </motion.div>
      )
    }

    return tracks
  }, [hThumb, hTrack, isHTrackVisible, isVTrackVisible, theme, vThumb, vTrack])

  return (
    <div className={clsx(className, 'relative overflow-hidden')}>
      <div
        ref={contentRef}
        className={clsx(contentClassName, 'overflow-auto hide-scrollbars')}
      >
        {children}
      </div>

      <AnimatePresence>{tracks}</AnimatePresence>
    </div>
  )
}
