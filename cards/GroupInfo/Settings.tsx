import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/common/Button.jsx'
import { NextLink } from '@/components/next/Link.js'
import { ROUTES } from '@/constants/routes.js'

interface SettingsProps {
  groupId: string
}

export const Settings = ({ groupId }: SettingsProps) => (
  <NextLink
    href={`${ROUTES.GROUP_SETTINGS(groupId)}?animation=forward`}
    as={ROUTES.GROUP_SETTINGS(groupId)}
  >
    <Button
      rounded
      size="sm"
      theme="white"
      iconStart={<Cog6ToothIcon />}
      aria-label="Settings"
    />
  </NextLink>
)
