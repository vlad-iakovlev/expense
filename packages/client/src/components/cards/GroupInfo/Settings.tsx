import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/common/Button'

type SettingsProps = {
  groupId: string
}

export const Settings = ({ groupId }: SettingsProps) => (
  <Link
    className="rounded-full"
    to="/group/$groupId/settings"
    params={{ groupId }}
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
