import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'

export const avatarColorClassNames = [
  'bg-red-800',
  'bg-orange-800',
  'bg-amber-800',
  'bg-yellow-800',
  'bg-lime-800',
  'bg-green-800',
  'bg-emerald-800',
  'bg-teal-800',
  'bg-cyan-800',
  'bg-sky-800',
  'bg-blue-800',
  'bg-indigo-800',
  'bg-violet-800',
  'bg-purple-800',
  'bg-fuchsia-800',
  'bg-pink-800',
  'bg-rose-800',
] as const

export type AvatarProps = Modify<
  React.ComponentProps<'div'>,
  {
    colorClassName?: string
    name?: string
    slug?: React.ReactNode
    src?: string
    size?: 'sm' | 'md'
    children?: never
  }
>

const getSlugByName = (name: string) => name.slice(0, 1)

const getColorClassNameByName = (name: string) => {
  const slug = getSlugByName(name)

  return avatarColorClassNames[
    (slug.charCodeAt(0) || 0) % avatarColorClassNames.length
  ]
}

export const Avatar = ({
  className,
  name = 'Unknown',
  colorClassName = getColorClassNameByName(name),
  slug = getSlugByName(name),
  src,
  size = 'md',
  ...rest
}: AvatarProps) => (
  <div
    className={twMerge(
      'overflow-hidden rounded-full',
      size === 'sm' && 'size-8',
      size === 'md' && 'size-10',
      className,
    )}
    {...rest}
  >
    {src ? (
      <img
        className="size-full object-cover"
        src={src}
        alt={`Avatar of ${name}`}
      />
    ) : (
      <div
        className={twMerge(
          'flex h-full w-full items-center justify-center font-medium text-white',
          colorClassName,
          size === 'sm' && 'text-sm',
        )}
      >
        {slug}
      </div>
    )}
  </div>
)
