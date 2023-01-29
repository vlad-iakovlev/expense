import clsx from 'clsx'
import { FC, useMemo } from 'react'

export interface AvatarProps {
  className?: string
  border?: boolean
  color?: string
  name?: string | null
  src?: string | null
}

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

const getSlugByName = (name: string | null | undefined) => {
  return name?.slice(0, 1) || ''
}

const getColorByName = (name: string | null | undefined) => {
  const slug = getSlugByName(name)

  return avatarColors[(slug.charCodeAt(0) || 0) % avatarColors.length]
}

export const Avatar: FC<AvatarProps> = ({
  className,
  border,
  color,
  name,
  src,
}) => {
  const image = useMemo(() => {
    if (src) {
      return (
        <img
          className="w-full h-full"
          src={src}
          alt={name || ''}
          referrerPolicy="no-referrer"
        />
      )
    }

    return (
      <div
        className={clsx(
          className,
          'flex items-center justify-center w-full h-full pt-px font-medium text-white',
          `bg-${color || getColorByName(name)}-700`
        )}
      >
        {getSlugByName(name)}
      </div>
    )
  }, [className, color, name, src])

  return (
    <div
      className={clsx(className, 'w-10 h-10 rounded-full overflow-hidden', {
        'border-4 border-white': border,
      })}
    >
      {image}
    </div>
  )
}
