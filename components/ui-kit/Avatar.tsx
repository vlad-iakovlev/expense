import clsx from 'clsx'
import { FC } from 'react'

export interface AvatarProps {
  className?: string
  border?: boolean
  name: string | null | undefined
  src: string | null | undefined
}

export const Avatar: FC<AvatarProps> = ({ className, border, name, src }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx(className, 'block w-10 h-10 rounded-full', {
        'border-4 border-white': border,
      })}
      src={src || ''}
      alt={name || ''}
      referrerPolicy="no-referrer"
    />
  )
}
