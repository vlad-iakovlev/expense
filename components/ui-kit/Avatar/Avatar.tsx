import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.js'
import { NextImage } from '../../next/Image.js'

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

export type AvatarProps = Modify<
  React.HTMLAttributes<HTMLDivElement>,
  {
    color?: string
    name?: string
    slug?: React.ReactNode
    src?: string
    size?: 'sm' | 'md'
    children?: never
  }
>

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
  ...rest
}: AvatarProps) => {
  return (
    <div
      className={twMerge(
        'overflow-hidden rounded-full',
        size === 'sm' && 'h-8 w-8',
        size === 'md' && 'h-10 w-10',
        className,
      )}
      {...rest}
    >
      {src ? (
        <NextImage
          src={src}
          alt={`Avatar of ${name}`}
          width={48}
          height={48}
          quality={100}
        />
      ) : (
        <div
          className={twMerge(
            'flex h-full w-full items-center justify-center font-medium text-white',
            `bg-${color}-700`,
            size === 'sm' && 'text-sm',
          )}
        >
          {slug}
        </div>
      )}
    </div>
  )
}
