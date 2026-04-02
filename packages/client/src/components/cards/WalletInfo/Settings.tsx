import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/common/Button'
import { Route as WalletSettingsRoute } from '@/routes/wallet.$walletId.settings'

type SettingsProps = {
  walletId: string
}

export const Settings = ({ walletId }: SettingsProps) => (
  <Link
    className="rounded-full"
    to={WalletSettingsRoute.to}
    params={{ walletId }}
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
