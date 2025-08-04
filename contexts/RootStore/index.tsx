import assert from 'assert'
import { createContext, useContext, useReducer } from 'react'
import { useStorage } from './hooks/useStorage/index'
import {
  CategoriesAction,
  categoriesReducer,
  isCategoriesAction,
} from './reducers/categories'
import { GroupsAction, groupsReducer, isGroupsAction } from './reducers/groups'
import {
  OperationsAction,
  isOperationsAction,
  operationsReducer,
} from './reducers/operations'
import {
  StorageAction,
  isStorageAction,
  storageReducer,
} from './reducers/storage'
import {
  WalletsAction,
  isWalletsAction,
  walletsReducer,
} from './reducers/wallet'
import { RootStoreState } from './types'
import { getEmptyState } from './utils'

type Action =
  | StorageAction
  | GroupsAction
  | WalletsAction
  | OperationsAction
  | CategoriesAction

type ContextValue = {
  state: RootStoreState
  dispatch: React.Dispatch<Action>
}

const reducer: React.Reducer<RootStoreState, Action> = (state, action) => {
  if (isStorageAction(action)) return storageReducer(state, action)
  if (isGroupsAction(action)) return groupsReducer(state, action)
  if (isWalletsAction(action)) return walletsReducer(state, action)
  if (isOperationsAction(action)) return operationsReducer(state, action)
  if (isCategoriesAction(action)) return categoriesReducer(state, action)
  return state
}

export const RootStoreContext = createContext<ContextValue | undefined>(
  undefined,
)
RootStoreContext.displayName = 'RootStoreContext'

type ProviderProps = {
  children: React.ReactNode
}

export const RootStoreProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getEmptyState())

  useStorage(state, dispatch)

  return (
    <RootStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </RootStoreContext.Provider>
  )
}

export const useRootStore = () => {
  const context = useContext(RootStoreContext)
  assert(context, 'useRootStore must be used within a RootStoreProvider')
  return context
}
