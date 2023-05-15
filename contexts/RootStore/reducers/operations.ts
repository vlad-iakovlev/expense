import { produce } from 'immer'
import { Reducer, ReducerAction } from 'react'
import { ClientOperationType } from '../../../types/client.ts'
import { OperationsActionTypes, RootStoreState } from '../types.tsx'

const createOperationReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.CREATE_OPERATION
    payload: {
      operationId: string
      walletId: string
    }
  }
> = (state, { payload: { operationId, walletId } }) => {
  return produce(state, (draft) => {
    draft.operations.push({
      id: operationId,
      removed: false,
      name: 'Untitled',
      category: 'No category',
      date: new Date(),
      incomeAmount: 0,
      expenseAmount: 0,
      incomeWalletId: null,
      expenseWalletId: walletId,
    })
    draft.nextSyncTransaction.operations.push(operationId)
  })
}

const removeOperationReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.REMOVE_OPERATION
    payload: {
      operationId: string
    }
  }
> = (state, { payload: { operationId } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.removed = true
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationNameReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_NAME
    payload: {
      operationId: string
      name: string
    }
  }
> = (state, { payload: { operationId, name } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.name = name
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationCategoryReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_CATEGORY
    payload: {
      operationId: string
      category: string
    }
  }
> = (state, { payload: { operationId, category } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.category = category
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationDateReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_DATE
    payload: {
      operationId: string
      date: Date
    }
  }
> = (state, { payload: { operationId, date } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.date = date
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationTypeReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_TYPE
    payload: {
      operationId: string
      type: ClientOperationType
    }
  }
> = (state, { payload: { operationId, type } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        const amount = operation.expenseAmount || operation.incomeAmount
        const walletId = operation.expenseWalletId ?? operation.incomeWalletId

        switch (type) {
          case ClientOperationType.INCOME:
            operation.incomeAmount = amount
            operation.expenseAmount = 0
            operation.incomeWalletId = walletId
            operation.expenseWalletId = null
            draft.nextSyncTransaction.operations.push(operationId)
            break

          case ClientOperationType.EXPENSE:
            operation.incomeAmount = 0
            operation.expenseAmount = amount
            operation.incomeWalletId = null
            operation.expenseWalletId = walletId
            draft.nextSyncTransaction.operations.push(operationId)
            break

          case ClientOperationType.TRANSFER:
            operation.incomeAmount = amount
            operation.expenseAmount = amount
            operation.incomeWalletId = walletId
            operation.expenseWalletId = walletId
            draft.nextSyncTransaction.operations.push(operationId)
            break
        }
      }
    })
  })
}

const setOperationIncomeAmountReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_INCOME_AMOUNT
    payload: {
      operationId: string
      incomeAmount: number
    }
  }
> = (state, { payload: { operationId, incomeAmount } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.incomeAmount = incomeAmount
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationExpenseAmountReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_EXPENSE_AMOUNT
    payload: {
      operationId: string
      expenseAmount: number
    }
  }
> = (state, { payload: { operationId, expenseAmount } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.expenseAmount = expenseAmount
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationIncomeWalletReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_INCOME_WALLET
    payload: {
      operationId: string
      incomeWalletId: string
    }
  }
> = (state, { payload: { operationId, incomeWalletId } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.incomeWalletId = incomeWalletId
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

const setOperationExpenseWalletReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.SET_OPERATION_EXPENSE_WALLET
    payload: {
      operationId: string
      expenseWalletId: string
    }
  }
> = (state, { payload: { operationId, expenseWalletId } }) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.id === operationId) {
        operation.expenseWalletId = expenseWalletId
        draft.nextSyncTransaction.operations.push(operationId)
      }
    })
  })
}

export type OperationsAction =
  | ReducerAction<typeof createOperationReducer>
  | ReducerAction<typeof removeOperationReducer>
  | ReducerAction<typeof setOperationNameReducer>
  | ReducerAction<typeof setOperationCategoryReducer>
  | ReducerAction<typeof setOperationDateReducer>
  | ReducerAction<typeof setOperationTypeReducer>
  | ReducerAction<typeof setOperationIncomeAmountReducer>
  | ReducerAction<typeof setOperationExpenseAmountReducer>
  | ReducerAction<typeof setOperationIncomeWalletReducer>
  | ReducerAction<typeof setOperationExpenseWalletReducer>

export const isOperationsAction = (action: {
  type: string
  payload?: unknown
}): action is OperationsAction => {
  return Object.values(OperationsActionTypes).includes(
    action.type as OperationsActionTypes
  )
}

export const operationsReducer: Reducer<RootStoreState, OperationsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case OperationsActionTypes.CREATE_OPERATION:
      return createOperationReducer(state, action)

    case OperationsActionTypes.REMOVE_OPERATION:
      return removeOperationReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_NAME:
      return setOperationNameReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_CATEGORY:
      return setOperationCategoryReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_DATE:
      return setOperationDateReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_TYPE:
      return setOperationTypeReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_INCOME_AMOUNT:
      return setOperationIncomeAmountReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_EXPENSE_AMOUNT:
      return setOperationExpenseAmountReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_INCOME_WALLET:
      return setOperationIncomeWalletReducer(state, action)

    case OperationsActionTypes.SET_OPERATION_EXPENSE_WALLET:
      return setOperationExpenseWalletReducer(state, action)
  }
}
