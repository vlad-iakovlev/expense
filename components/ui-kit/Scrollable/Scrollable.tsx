import { Variants, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Thumb, Track, getThumb, getTrack } from './utils.js'

const DEFAULT_TRACK: Track = {
  startOffset: 0,
  endOffset: 0,
  edgeOffset: 0,
  thickness: 0,
  length: 0,
}

const DEFAULT_THUMB: Thumb = { offset: 0, length: 0 }

const variants: Variants = {
  opened: {
    opacity: 1,
    transition: { duration: 0.075 },
  },

  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export interface ScrollableProps {
  className?: string
  contentClassName?: string
  children: React.ReactNode
}

export const Scrollable = ({
  className,
  contentClassName,
  children,
}: ScrollableProps) => {
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

  const thumbClassName =
    'absolute rounded-full bg-black bg-opacity-[0.35] dark:bg-white dark:bg-opacity-50'

  return (
    <div className={twMerge('relative overflow-hidden', className)}>
      <div
        ref={contentRef}
        className={twMerge('hide-scrollbars overflow-auto', contentClassName)}
      >
        {children}
      </div>

      <motion.div
        key="v-track"
        className="pointer-events-none absolute"
        animate={isVTrackVisible ? 'opened' : 'closed'}
        variants={variants}
        style={{
          top: vTrack.startOffset,
          bottom: vTrack.endOffset,
          right: vTrack.edgeOffset,
          width: vTrack.thickness,
        }}
        aria-hidden="true"
      >
        <div
          className={twMerge(thumbClassName, 'w-full')}
          style={{ top: vThumb.offset, height: vThumb.length }}
        />
      </motion.div>

      <motion.div
        key="h-track"
        className="pointer-events-none absolute"
        animate={isHTrackVisible ? 'opened' : 'closed'}
        variants={variants}
        style={{
          left: hTrack.startOffset,
          right: hTrack.endOffset,
          bottom: hTrack.edgeOffset,
          height: hTrack.thickness,
        }}
        aria-hidden="true"
      >
        <div
          className={twMerge(thumbClassName, 'h-full')}
          style={{ left: hThumb.offset, width: hThumb.length }}
        />
      </motion.div>
    </div>
  )
}
