export const ROUTES = {
  DASHBOARD: '/',
  GROUP: (groupId: string) => `/groups/${groupId}`,
  OPERATION: (operationId: string) => `/operations/${operationId}`,
  WALLET: (walletId: string) => `/wallets/${walletId}`,
  INVITE: (token: string) => `/invites/${token}`,
}
