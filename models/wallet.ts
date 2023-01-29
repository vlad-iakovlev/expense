import { Wallet } from '@prisma/client'
import { ClientCurrency } from './currency'

export type ClientWallet = Pick<Wallet, 'id' | 'name' | 'emoji' | 'color'> & {
  currency: ClientCurrency
}
