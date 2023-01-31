export const SWR_KEYS = {
  GROUPS: 'groups',
  GROUP: (groupId: string) => `group-${groupId}`,
  WALLETS: (groupId: string) => `group-${groupId}/wallets`,
  WALLET: (groupId: string, walletId: string) =>
    `groups-${groupId}/wallet-${walletId}`,
}
