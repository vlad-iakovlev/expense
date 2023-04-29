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
  SynchronizeAction,
  isSynchronizeAction,
  synchronizeReducer,
} from './reducers/synchronize.ts'
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
  | SynchronizeAction

interface ContextValue {
  state: RootStoreState
  dispatch: Dispatch<Action>
}

interface ProviderProps {
  children: ReactNode
}

const reducer: Reducer<RootStoreState, Action> = (state, action) => {
  if (isGroupsAction(action)) return groupsReducer(state, action)
  if (isWalletsAction(action)) return walletsReducer(state, action)
  if (isOperationsAction(action)) return operationsReducer(state, action)
  if (isCategoriesAction(action)) return categoriesReducer(state, action)
  if (isSynchronizeAction(action)) return synchronizeReducer(state, action)
  return state
}

export const RootStoreContext = createContext<ContextValue | undefined>(
  undefined
)
RootStoreContext.displayName = 'RootStoreContext'

export const RootStoreProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    currencies: [
      {
        id: 'usd-mock',
        name: 'USD',
        symbol: '$',
        rate: 1,
      },
      {
        id: 'eur-mock',
        name: 'EUR',
        symbol: '€',
        rate: 0.9,
      },
      {
        id: 'rub-mock',
        name: 'RUB',
        symbol: '₽',
        rate: 80,
      },
    ],
    groups: [],
    wallets: [],
    operations: [],
  })

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
