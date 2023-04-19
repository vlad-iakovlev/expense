import { clsx } from 'clsx'
import { FC, useMemo } from 'react'
import { Avatar, AvatarProps } from '../Avatar/Avatar.tsx'

export interface AvatarGroupProps {
  className?: string
  avatars: AvatarProps[]
  max?: number
  size?: 'sm' | 'md'
}

export const AvatarGroup: FC<AvatarGroupProps> = ({
  className,
  avatars,
  max,
  size = 'md',
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
          size={size}
          className={clsx(props.className, {
            '-ml-5': index > 0 && size === 'sm',
            '-ml-6': index > 0 && size === 'md',
          })}
        />
      ))}

      {extraCount > 0 && (
        <Avatar
          className={clsx({
            '-ml-5': size === 'sm',
            '-ml-6': size === 'md',
          })}
          color="green"
          slug={`+${extraCount}`}
          size={size}
        />
      )}
    </div>
  )
}
