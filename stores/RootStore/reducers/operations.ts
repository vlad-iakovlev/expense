import { Reducer, ReducerAction } from 'react'
import { ClientOperationType } from '../../../types/client.ts'
import { OperationsActionTypes, RootStoreState } from '../types.tsx'
import { createInState, updateInState } from '../utils.ts'

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
  return createInState(state, 'operations', {
    id: operationId,
    name: 'Untitled',
    category: 'No category',
    date: new Date(),
    incomeAmount: 0,
    expenseAmount: 0,
    incomeWalletId: null,
    expenseWalletId: walletId,
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
  return updateInState(state, 'operations', operationId, {
    removed: true,
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
  return updateInState(state, 'operations', operationId, { name })
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
  return updateInState(state, 'operations', operationId, { category })
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
  return updateInState(state, 'operations', operationId, { date })
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
  return updateInState(state, 'operations', operationId, (operation) => {
    const amount = operation.expenseAmount || operation.incomeAmount
    const walletId =
      operation.expenseWalletId ?? operation.incomeWalletId ?? null

    switch (type) {
      case ClientOperationType.INCOME: {
        return {
          ...operation,
          updatedAt: new Date(),
          incomeAmount: amount,
          expenseAmount: 0,
          incomeWalletId: walletId,
          expenseWalletId: null,
        }
      }

      case ClientOperationType.EXPENSE:
        return {
          ...operation,
          updatedAt: new Date(),
          incomeAmount: 0,
          expenseAmount: amount,
          incomeWalletId: null,
          expenseWalletId: walletId ?? null,
        }

      case ClientOperationType.TRANSFER:
        return {
          ...operation,
          updatedAt: new Date(),
          incomeAmount: amount,
          expenseAmount: amount,
          incomeWalletId: walletId ?? null,
          expenseWalletId: walletId ?? null,
        }
    }
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
  return updateInState(state, 'operations', operationId, { incomeAmount })
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
  return updateInState(state, 'operations', operationId, { expenseAmount })
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
  return updateInState(state, 'operations', operationId, { incomeWalletId })
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
  return updateInState(state, 'operations', operationId, { expenseWalletId })
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
