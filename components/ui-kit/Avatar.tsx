import clsx from 'clsx'
import { FC, ReactNode } from 'react'

export const avatarColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const

export interface AvatarProps {
  className?: string
  color?: string
  name?: string | null
  slug?: ReactNode
  src?: string | null
  size?: 'sm' | 'md'
}

const getSlugByName = (name: string | null | undefined) => {
  return name?.slice(0, 1) || ''
}

const getColorByName = (name: string | null | undefined) => {
  const slug = getSlugByName(name)

  return avatarColors[(slug.charCodeAt(0) || 0) % avatarColors.length]
}

export const Avatar: FC<AvatarProps> = ({
  className,
  color,
  name,
  slug,
  src,
  size = 'md',
}) => {
  return (
    <div
      className={clsx(className, 'rounded-full overflow-hidden', {
        'w-8 h-8': size === 'sm',
        'w-10 h-10': size === 'md',
      })}
    >
      {src ? (
        <img
          className="w-full h-full"
          src={src}
          alt={name || ''}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={clsx(
            'flex items-center justify-center w-full h-full font-medium text-white',
            `bg-${color || getColorByName(name)}-700`,
            { 'text-sm': size === 'sm' }
          )}
        >
          {slug || getSlugByName(name)}
        </div>
      )}
    </div>
  )
}
