export const SWR_KEYS = {
  GROUPS: 'groups',
  GROUP: (groupId: string) => `group-${groupId}`,
  WALLETS: 'wallets',
  GROUP_WALLETS: (groupId: string) => `group-${groupId}/wallets`,
  WALLET: (walletId: string) => `wallet-${walletId}`,
  CURRENCIES: 'currencies',
}
