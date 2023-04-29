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
  BrowserStorageAction,
  browserStorageReducer,
  isBrowserStorageAction,
} from './reducers/browserStorage.ts'
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
  RemoteStorageAction,
  isRemoteStorageAction,
  remoteStorageReducer,
} from './reducers/remoteStorage.ts'
import {
  WalletsAction,
  isWalletsAction,
  walletsReducer,
} from './reducers/wallet.ts'
import { RootStoreState } from './types.tsx'

type Action =
  | GroupsAction
  | WalletsAction
  | OperationsAction
  | CategoriesAction
  | BrowserStorageAction
  | RemoteStorageAction

interface ContextValue {
  state: RootStoreState
  dispatch: Dispatch<Action>
}

const reducer: Reducer<RootStoreState, Action> = (state, action) => {
  if (isGroupsAction(action)) {
    return { ...groupsReducer(state, action), shouldSynchronize: true }
  }

  if (isWalletsAction(action)) {
    return { ...walletsReducer(state, action), shouldSynchronize: true }
  }

  if (isOperationsAction(action)) {
    return { ...operationsReducer(state, action), shouldSynchronize: true }
  }

  if (isCategoriesAction(action)) {
    return { ...categoriesReducer(state, action), shouldSynchronize: true }
  }

  if (isBrowserStorageAction(action)) {
    return browserStorageReducer(state, action)
  }

  if (isRemoteStorageAction(action)) {
    return remoteStorageReducer(state, action)
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
    isReady: false,
    shouldSynchronize: false,
    syncedAt: null,
  })

  useBrowserStorage(state, dispatch)
  useRemoteStorage(state, dispatch)

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
