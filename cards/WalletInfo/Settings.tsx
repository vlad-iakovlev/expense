import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ROUTES } from '@/constants/routes.js'

interface SettingsProps {
  walletId: string
}

export const Settings = ({ walletId }: SettingsProps) => {
  const router = useRouter()

  const handleClick = React.useCallback(() => {
    void (async () => {
      const href = ROUTES.WALLET_SETTINGS(walletId)
      await router.push(
        { pathname: href, query: { animation: 'forward' } },
        href,
      )
    })()
  }, [router, walletId])

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
