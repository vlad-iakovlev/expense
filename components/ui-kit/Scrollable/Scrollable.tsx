import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Thumb, Track, getThumb, getTrack } from './utils.ts'

export interface ScrollableProps {
  className?: string
  contentClassName?: string
  children: ReactNode
}

const DEFAULT_TRACK: Track = {
  startOffset: 0,
  endOffset: 0,
  edgeOffset: 0,
  thickness: 0,
  length: 0,
}

const DEFAULT_THUMB: Thumb = { offset: 0, length: 0 }

export const Scrollable: FC<ScrollableProps> = ({
  className,
  contentClassName,
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

    contentEl.addEventListener('scroll', handleScroll)
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

  return (
    <div className={clsx(className, 'relative overflow-hidden')}>
      <div
        ref={contentRef}
        className={clsx(contentClassName, 'overflow-auto hide-scrollbars')}
      >
        {children}
      </div>

      <Transition
        aria-hidden
        unmount={false}
        show={isVTrackVisible}
        className="absolute pointer-events-none"
        enter="transition-opacity ease-out duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        style={{
          top: vTrack.startOffset,
          bottom: vTrack.endOffset,
          right: vTrack.edgeOffset,
          width: vTrack.thickness,
        }}
      >
        <div
          className="absolute w-full bg-black bg-opacity-50 rounded-full"
          style={{
            top: vThumb.offset,
            height: vThumb.length,
          }}
        />
      </Transition>

      <Transition
        aria-hidden
        unmount={false}
        show={isHTrackVisible}
        className="absolute pointer-events-none"
        enter="transition-opacity ease-out duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        style={{
          left: hTrack.startOffset,
          right: hTrack.endOffset,
          bottom: hTrack.edgeOffset,
          height: hTrack.thickness,
        }}
      >
        <div
          className="absolute h-full bg-black bg-opacity-50 rounded-full"
          style={{
            left: hThumb.offset,
            width: hThumb.length,
          }}
        />
      </Transition>
    </div>
  )
}
