import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import {
  CSSProperties,
  FC,
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { getThumbParams } from './utils.ts'

interface ClassNames {
  root?: string
  content?: string
}

export interface ScrollableProps {
  classNames?: ClassNames
  children: ReactNode
}

export const Scrollable: FC<ScrollableProps> = ({
  classNames = {},
  children,
}) => {
  const [isVThumbVisible, setIsVThumbVisible] = useState(false)
  const [isHThumbVisible, setIsHThumbVisible] = useState(false)
  const [vThumbStyle, setVThumbStyle] = useState<CSSProperties>({})
  const [hThumbStyle, setHThumbStyle] = useState<CSSProperties>({})

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const {
      scrollTop,
      scrollLeft,
      scrollHeight,
      scrollWidth,
      clientHeight,
      clientWidth,
    } = event.currentTarget

    const isVThumbVisible = scrollHeight > clientHeight
    const isHThumbVisible = scrollWidth > clientWidth

    setIsVThumbVisible(isVThumbVisible)
    const vThumbParams = getThumbParams({
      scrolled: scrollTop,
      container: clientHeight,
      content: scrollHeight,
      bothVisible: isVThumbVisible && isHThumbVisible,
    })
    setVThumbStyle({
      top: vThumbParams.scrolledOffset,
      right: vThumbParams.edgeOffset,
      height: vThumbParams.length,
      width: vThumbParams.thickness,
    })

    setIsHThumbVisible(isHThumbVisible)
    const hThumbParams = getThumbParams({
      scrolled: scrollLeft,
      container: clientWidth,
      content: scrollWidth,
      bothVisible: isVThumbVisible && isHThumbVisible,
    })
    setHThumbStyle({
      bottom: hThumbParams.edgeOffset,
      left: hThumbParams.scrolledOffset,
      height: hThumbParams.thickness,
      width: hThumbParams.length,
    })
  }, [])

  useEffect(() => {
    if (isVThumbVisible) {
      const timerId = setTimeout(() => setIsVThumbVisible(false), 300)
      return () => clearTimeout(timerId)
    }
  }, [isVThumbVisible, vThumbStyle])

  useEffect(() => {
    if (isHThumbVisible) {
      const timerId = setTimeout(() => setIsHThumbVisible(false), 300)
      return () => clearTimeout(timerId)
    }
  }, [isHThumbVisible, hThumbStyle])

  return (
    <div className={clsx(classNames.root, 'relative overflow-hidden')}>
      <div
        className={clsx(classNames.content, 'overflow-auto hide-scrollbars')}
        onScroll={handleScroll}
      >
        {children}
      </div>

      <Transition
        unmount={false}
        show={isVThumbVisible}
        className="absolute bg-black bg-opacity-50 rounded-full pointer-events-none"
        enter="transition-opacity ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        style={vThumbStyle}
      />

      <Transition
        unmount={false}
        show={isHThumbVisible}
        className="absolute bg-black bg-opacity-50 rounded-full pointer-events-none"
        enter="transition-opacity ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        style={hThumbStyle}
      />
    </div>
  )
}
