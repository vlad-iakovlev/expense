import { GetCategoriesQuery } from '../api/types/categories'
import { GetGroupQuery } from '../api/types/groups'
import { GetOperationQuery, GetOperationsQuery } from '../api/types/operations'
import { GetWalletQuery, GetWalletsQuery } from '../api/types/wallets'
import { request } from '../utils/request'

export const SWR_KEYS = {
  CATEGORIES: (query: GetCategoriesQuery) =>
    request.withQuery('categories', query),
  CURRENCIES: () => 'currencies',
  GROUPS: () => 'groups',
  GROUP: (query: GetGroupQuery) => request.withQuery('group', query),
  OPERATIONS: (query: GetOperationsQuery) =>
    request.withQuery('operations', query),
  OPERATION: (query: GetOperationQuery) =>
    request.withQuery('operation', query),
  WALLETS: (query: GetWalletsQuery) => request.withQuery('wallets', query),
  WALLET: (query: GetWalletQuery) => request.withQuery('wallet', query),
}
