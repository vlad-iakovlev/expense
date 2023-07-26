export const ROUTES = {
  DASHBOARD: '/',
  GROUP: (groupId: string) => `/groups/${groupId}`,
  GROUP_SETTINGS: (groupId: string) => `/groups/${groupId}/settings`,
  OPERATION: (operationId: string) => `/operations/${operationId}`,
  WALLET: (walletId: string) => `/wallets/${walletId}`,
  INVITE: (token: string) => `/invites/${token}`,
}
