import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'
import { NextImage } from '../NextImage/NextImage.ts'

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
  name?: string
  slug?: ReactNode
  src?: string
  size?: 'sm' | 'md'
}

const getSlugByName = (name: string) => {
  return name.slice(0, 1)
}

const getColorByName = (name: string) => {
  const slug = getSlugByName(name)

  return avatarColors[(slug.charCodeAt(0) || 0) % avatarColors.length]
}

export const Avatar: FC<AvatarProps> = ({
  className,
  name = 'Unknown',
  color = getColorByName(name),
  slug = getSlugByName(name),
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
        <NextImage src={src} alt={name} width={48} height={48} quality={100} />
      ) : (
        <div
          className={clsx(
            'flex items-center justify-center w-full h-full font-medium text-white',
            `bg-${color}-700`,
            { 'text-sm': size === 'sm' }
          )}
        >
          {slug}
        </div>
      )}
    </div>
  )
}
