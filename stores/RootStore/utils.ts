import { MayBeFn } from '../../types/utility.ts'
import { RootStoreState } from './types.tsx'

export const createInState = <
  Scope extends 'groups' | 'wallets' | 'operations'
>(
  state: RootStoreState,
  scope: Scope,
  data: Omit<RootStoreState[Scope][number], 'updatedAt' | 'removed'>
): RootStoreState => {
  return {
    ...state,
    [scope]: [
      ...state[scope],
      {
        ...data,
        updatedAt: new Date(),
        removed: false,
      },
    ],
  }
}

export const updateInState = <
  Scope extends 'groups' | 'wallets' | 'operations'
>(
  state: RootStoreState,
  scope: Scope,
  id: string,
  data: MayBeFn<
    [RootStoreState[Scope][number]],
    Partial<Omit<RootStoreState[Scope][number], 'id' | 'updatedAt'>>
  >
): RootStoreState => {
  const getData = typeof data === 'function' ? data : () => data

  return {
    ...state,
    [scope]: state[scope].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...getData(item),
          updatedAt: new Date(),
        }
      }

      return item
    }),
  }
}
