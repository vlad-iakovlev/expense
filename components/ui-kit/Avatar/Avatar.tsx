import { twMerge } from 'tailwind-merge'
import { NextImage } from '../../next/Image.ts'

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
  slug?: React.ReactNode
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

export const Avatar = ({
  className,
  name = 'Unknown',
  color = getColorByName(name),
  slug = getSlugByName(name),
  src,
  size = 'md',
}: AvatarProps) => {
  return (
    <div
      className={twMerge(
        'rounded-full overflow-hidden',
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-10 h-10',
        className
      )}
    >
      {src ? (
        <NextImage src={src} alt={name} width={48} height={48} quality={100} />
      ) : (
        <div
          className={twMerge(
            'flex items-center justify-center w-full h-full font-medium text-white',
            `bg-${color}-700`,
            size === 'sm' && 'text-sm'
          )}
        >
          {slug}
        </div>
      )}
    </div>
  )
}
