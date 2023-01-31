export const ROUTES = {
  DASHBOARD: '/dashboard',
  GROUP: (groupId: string) => `/dashboard/groups/${groupId}`,
  WALLET: (walletId: string) => `/dashboard/wallets/${walletId}`,
}
