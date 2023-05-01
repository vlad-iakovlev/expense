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

    setIsVThumbVisible(scrollHeight > clientHeight)
    setVThumbStyle({
      top: (scrollTop / scrollHeight) * (clientHeight - 32) + 8,
      height: (clientHeight / scrollHeight) * (clientHeight - 32) + 16,
    })

    setIsHThumbVisible(scrollWidth > clientWidth)
    setHThumbStyle({
      left: (scrollLeft / scrollWidth) * (clientWidth - 32) + 8,
      width: (clientWidth / scrollWidth) * (clientWidth - 32) + 16,
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
        className="absolute right-2 w-[3px] bg-black bg-opacity-50 rounded-full pointer-events-none"
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
        className="absolute bottom-2 h-[3px] bg-black bg-opacity-50 rounded-full pointer-events-none"
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
