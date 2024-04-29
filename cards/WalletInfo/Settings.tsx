import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/common/Button.jsx'
import { NextLink } from '@/components/next/Link.js'
import { ROUTES } from '@/constants/routes.js'

interface SettingsProps {
  walletId: string
}

export const Settings = ({ walletId }: SettingsProps) => (
  <NextLink
    href={`${ROUTES.WALLET_SETTINGS(walletId)}?animation=forward`}
    as={ROUTES.WALLET_SETTINGS(walletId)}
    aria-label="Settings"
  >
    <Button
      rounded
      size="sm"
      theme="white"
      iconStart={<Cog6ToothIcon />}
      tabIndex={-1}
    />
  </NextLink>
)
