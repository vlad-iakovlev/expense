import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'
import { Avatar, AvatarProps } from './Avatar'

export type AvatarGroupProps = Modify<
  React.HTMLAttributes<HTMLDivElement>,
  {
    avatars: AvatarProps[]
    max?: number
    size?: 'sm' | 'md'
    children?: never
  }
>

export const AvatarGroup = ({
  className,
  avatars,
  max,
  size = 'md',
  ...rest
}: AvatarGroupProps) => {
  const visibleCount = max && avatars.length > max ? max - 1 : avatars.length
  const extraCount = avatars.length - visibleCount

  const visibleAvatars = React.useMemo(
    () => avatars.slice(0, visibleCount),
    [avatars, visibleCount],
  )

  return (
    <div className={twMerge('flex items-center', className)} {...rest}>
      {visibleAvatars.map((props, index) => (
        <Avatar
          {...props}
          key={props.src ?? index}
          size={size}
          className={twMerge(
            index > 0 && size === 'sm' && '-ml-5',
            index > 0 && size === 'md' && '-ml-6',
            props.className,
          )}
        />
      ))}

      {extraCount > 0 && (
        <Avatar
          className={twMerge(
            size === 'sm' && '-ml-5',
            size === 'md' && '-ml-6',
          )}
          colorClassName="bg-green-800"
          slug={`+${extraCount}`}
          size={size}
        />
      )}
    </div>
  )
}
