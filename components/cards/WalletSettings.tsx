import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { updateWallet } from '../../api/client/wallets'
import { ClientCurrency } from '../../api/types/currencies'
import { ClientWallet } from '../../api/types/wallets'
import { SWR_KEYS } from '../../constants/swr'
import { Card } from '../ui-kit/Card'

interface Props {
  currencies: ClientCurrency[]
  wallet: ClientWallet
}

export const WalletSettings: FC<Props> = ({ currencies, wallet }) => {
  const { mutate } = useSWRConfig()
  const [isSaving, setIsSaving] = useState(false)

  const handleUpdateCurrency = useCallback(
    async (currencyId: string) => {
      if (currencyId === wallet.currency.id) return

      try {
        setIsSaving(true)
        await updateWallet(wallet.group.id, wallet.id, { currencyId })
        await mutate(SWR_KEYS.WALLET(wallet.id))
      } finally {
        setIsSaving(false)
      }
    },
    [mutate, wallet.currency.id, wallet.group.id, wallet.id]
  )

  return (
    <Card>
      <Card.Title title="Settings" />

      <Card.Divider />

      <Menu as="div" className="relative">
        <Menu.Button
          as={Card.Button}
          end={<div className="font-medium">{wallet.currency.name}</div>}
        >
          Currency
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            as={Card}
            className="absolute right-0 -mt-2 z-10 origin-top-right focus:outline-none"
          >
            {currencies.map((currency) => (
              <Menu.Item
                as={Card.Button}
                key={currency.id}
                disabled={isSaving}
                onClick={() => handleUpdateCurrency(currency.id)}
              >
                {currency.name}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </Card>
  )
}
