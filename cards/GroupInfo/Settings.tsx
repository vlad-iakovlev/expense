import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ROUTES } from '@/constants/routes.js'

interface SettingsProps {
  groupId: string
}

export const Settings = ({ groupId }: SettingsProps) => {
  const router = useRouter()

  const handleClick = React.useCallback(() => {
    void (async () => {
      const href = ROUTES.GROUP_SETTINGS(groupId)
      await router.push(
        { pathname: href, query: { animation: 'forward' } },
        href,
      )
    })()
  }, [groupId, router])

  return (
    <Button
      rounded
      size="sm"
      theme="white"
      iconStart={<Cog6ToothIcon />}
      aria-label="Settings"
      onClick={handleClick}
    />
  )
}
