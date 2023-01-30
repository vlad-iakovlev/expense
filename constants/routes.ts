export const ROUTES = {
  DASHBOARD: '/dashboard',
  GROUP: (groupId: string) => `${ROUTES.DASHBOARD}/groups/${groupId}`,
  WALLET: (groupId: string, walletId: string) =>
    `${ROUTES.GROUP(groupId)}/wallets/${walletId}`,
}
