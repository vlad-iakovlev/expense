import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'

interface SettingsProps {
  walletId: string
}

export const Settings = ({ walletId }: SettingsProps) => (
  <Link
    className="rounded-full"
    href={ROUTES.WALLET_SETTINGS(walletId)}
    aria-label="Settings"
  >
    <Button
      rounded
      size="sm"
      theme="white"
      iconStart={<Cog6ToothIcon />}
      tabIndex={-1}
    />
  </Link>
)
