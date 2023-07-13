import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarProps } from '../Avatar/Avatar.tsx'

export interface AvatarGroupProps {
  className?: string
  avatars: AvatarProps[]
  max?: number
  size?: 'sm' | 'md'
}

export const AvatarGroup = ({
  className,
  avatars,
  max,
  size = 'md',
}: AvatarGroupProps) => {
  const visibleCount = max && avatars.length > max ? max - 1 : avatars.length
  const extraCount = avatars.length - visibleCount

  const visibleAvatars = useMemo(() => {
    return avatars.slice(0, visibleCount)
  }, [avatars, visibleCount])

  return (
    <div className={twMerge('flex items-center', className)}>
      {visibleAvatars.map((props, index) => (
        <Avatar
          {...props}
          key={props.src ?? index}
          size={size}
          className={twMerge(
            index > 0 && size === 'sm' && '-ml-5',
            index > 0 && size === 'md' && '-ml-6',
            props.className
          )}
        />
      ))}

      {extraCount > 0 && (
        <Avatar
          className={twMerge(
            size === 'sm' && '-ml-5',
            size === 'md' && '-ml-6'
          )}
          color="green"
          slug={`+${extraCount}`}
          size={size}
        />
      )}
    </div>
  )
}
