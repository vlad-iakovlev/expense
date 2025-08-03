import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'

interface SettingsProps {
  groupId: string
}

export const Settings = ({ groupId }: SettingsProps) => (
  <Link
    className="rounded-full"
    href={ROUTES.GROUP_SETTINGS(groupId)}
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
