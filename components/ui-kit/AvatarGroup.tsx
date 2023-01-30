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
          key={props.src}
          className={clsx(props.className, { '-ml-6': index > 0 })}
        />
      ))}

      {extraCount > 0 && (
        <Avatar className="-ml-6" color="green" slug={`+${extraCount}`} />
      )}
    </div>
  )
}
