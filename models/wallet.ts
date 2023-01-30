import { Group, Wallet } from '@prisma/client'
import { ClientCurrency } from './currency'

export type ClientWallet = Pick<Wallet, 'id' | 'name'> & {
  group: Pick<Group, 'id' | 'name'>
  currency: ClientCurrency
  balance: number
}
