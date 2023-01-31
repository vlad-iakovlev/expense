export const SWR_KEYS = {
  CURRENCIES: 'currencies',

  GROUPS: 'groups',
  GROUP: (groupId: string) => `group-${groupId}`,
  GROUP_WALLETS: (groupId: string) => `group-${groupId}/wallets`,

  WALLETS: 'wallets',
  WALLET: (walletId: string) => `wallet-${walletId}`,
  WALLET_OPERATIONS: (walletId: string) => `wallet-${walletId}/operations`,
}
