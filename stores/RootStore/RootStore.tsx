import assert from 'assert'
import {
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { useStorage } from './hooks/useStorage/useStorage.ts'
import {
  CategoriesAction,
  categoriesReducer,
  isCategoriesAction,
} from './reducers/categories.ts'
import {
  GroupsAction,
  groupsReducer,
  isGroupsAction,
} from './reducers/groups.ts'
import {
  OperationsAction,
  isOperationsAction,
  operationsReducer,
} from './reducers/operations.ts'
import {
  StorageAction,
  isStorageAction,
  storageReducer,
} from './reducers/storage.ts'
import {
  WalletsAction,
  isWalletsAction,
  walletsReducer,
} from './reducers/wallet.ts'
import { RootStoreState } from './types.tsx'
import { getEmptyState } from './utils.ts'

type Action =
  | StorageAction
  | GroupsAction
  | WalletsAction
  | OperationsAction
  | CategoriesAction

interface ContextValue {
  state: RootStoreState
  dispatch: Dispatch<Action>
}

const reducer: Reducer<RootStoreState, Action> = (state, action) => {
  if (isStorageAction(action)) return storageReducer(state, action)
  if (isGroupsAction(action)) return groupsReducer(state, action)
  if (isWalletsAction(action)) return walletsReducer(state, action)
  if (isOperationsAction(action)) return operationsReducer(state, action)
  if (isCategoriesAction(action)) return categoriesReducer(state, action)
  return state
}

export const RootStoreContext = createContext<ContextValue | undefined>(
  undefined
)
RootStoreContext.displayName = 'RootStoreContext'

interface ProviderProps {
  children: ReactNode
}

export const RootStoreProvider: FC<ProviderProps> = ({ children }) => {
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
