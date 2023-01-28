import { FC } from 'react'

export interface AvatarProps {
  name: string
  src: string
}

export const Avatar: FC<AvatarProps> = ({ name, src }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="block w-10 h-10 rounded-full"
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
    />
  )
}
