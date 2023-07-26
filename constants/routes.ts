export const ROUTES = {
  DASHBOARD: '/',
  GROUP: (groupId: string) => `/groups/${groupId}`,
  GROUP_SETTINGS: (groupId: string) => `/groups/${groupId}/settings`,
  OPERATION: (operationId: string) => `/operations/${operationId}`,
  WALLET: (walletId: string) => `/wallets/${walletId}`,
  WALLET_SETTINGS: (walletId: string) => `/wallets/${walletId}/settings`,
  INVITE: (token: string) => `/invites/${token}`,
}
