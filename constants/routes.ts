export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  GROUP: (groupId: string) => `/groups/${groupId}`,
  OPERATION: (operationId: string) => `/operations/${operationId}`,
  WALLET: (walletId: string) => `/wallets/${walletId}`,
}
