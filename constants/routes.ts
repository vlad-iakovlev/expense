export const ROUTES = {
  DASHBOARD: '/dashboard',
  GROUP: (groupId: string) => `/dashboard/groups/${groupId}`,
  OPERATION: (operationId: string) => `/dashboard/operations/${operationId}`,
  WALLET: (walletId: string) => `/dashboard/wallets/${walletId}`,
}
