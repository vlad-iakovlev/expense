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
import { useBrowserStorage } from './hooks/useBrowserStorage.ts'
import { useRemoteStorage } from './hooks/useRemoteStorage.ts'
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
  StorageReducer,
  isStorageAction,
} from './reducers/storage.ts'
import {
  WalletsAction,
  isWalletsAction,
  walletsReducer,
} from './reducers/wallet.ts'
import { RootStoreState } from './types.tsx'

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
  if (isStorageAction(action)) {
    return StorageReducer(state, action)
  }

  if (isGroupsAction(action)) {
    return { ...groupsReducer(state, action), shouldSync: true }
  }

  if (isWalletsAction(action)) {
    return { ...walletsReducer(state, action), shouldSync: true }
  }

  if (isOperationsAction(action)) {
    return { ...operationsReducer(state, action), shouldSync: true }
  }

  if (isCategoriesAction(action)) {
    return { ...categoriesReducer(state, action), shouldSync: true }
  }

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
  const [state, dispatch] = useReducer(reducer, {
    currencies: [],
    groups: [],
    wallets: [],
    operations: [],
    isSyncing: false,
    shouldSync: false,
    syncedAt: null,
  })

  const { isBrowserStorageLoaded } = useBrowserStorage(state, dispatch)
  useRemoteStorage(state, dispatch, isBrowserStorageLoaded)

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
