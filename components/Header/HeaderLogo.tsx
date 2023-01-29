import Link from 'next/link'
import { FC } from 'react'
import LogoImage from '../../assets/logo.svg'

export const HeaderLogo: FC = () => {
  return (
    <Link
      className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500"
      href="/"
    >
      <LogoImage className="h-6" />
    </Link>
  )
}
