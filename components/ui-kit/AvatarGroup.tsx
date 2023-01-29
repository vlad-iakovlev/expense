import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { Avatar, AvatarProps } from './Avatar'

export interface AvatarGroupProps {
  className?: string
  avatars: AvatarProps[]
  max?: number
}

export const AvatarGroup: FC<AvatarGroupProps> = ({
  className,
  avatars,
  max,
}) => {
  const visibleCount = max && avatars.length > max ? max - 1 : avatars.length
  const extraCount = avatars.length - visibleCount

  const visibleAvatars = useMemo(() => {
    return avatars.slice(0, visibleCount)
  }, [avatars, visibleCount])

  return (
    <div className={clsx(className, 'flex items-center')}>
      {visibleAvatars.map((props, index) => (
        <Avatar
          {...props}
          border
          key={props.src}
          className={clsx(props.className, { '-ml-6': index > 0 })}
        />
      ))}
      {extraCount > 0 && (
        <div className="flex items-center justify-center min-w-10 h-10 -ml-6 rounded-full bg-green-700 text-xs font-medium text-white border-4 border-white">
          +{extraCount}
        </div>
      )}
    </div>
  )
}
