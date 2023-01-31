import { FC, useCallback } from 'react'
import { useSWRConfig } from 'swr'
import { updateWallet } from '../../api/client/wallets'
import { ClientWallet } from '../../api/types/wallets'
import { ROUTES } from '../../constants/routes'
import { SWR_KEYS } from '../../constants/swr'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

interface Props {
  wallet: ClientWallet
}

export const Wallet: FC<Props> = ({ wallet }) => {
  const { mutate } = useSWRConfig()

  const handleNameChange = useCallback(
    async (name: string) => {
      await updateWallet(wallet.group.id, wallet.id, { name })
      await mutate(SWR_KEYS.WALLET(wallet.id))
    },
    [mutate, wallet.group.id, wallet.id]
  )

  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.Link
          href={ROUTES.GROUP(wallet.group.id)}
          title={wallet.group.name}
        />
        <Breadcrumbs.EditableTitle
          title={wallet.name}
          onChange={handleNameChange}
        />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6"></div>
    </>
  )
}
