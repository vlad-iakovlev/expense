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
> = (state, action) => {
  return {
    ...state,
    operations: [
      ...state.operations,
      {
        id: action.payload.operationId,
        name: 'Untitled',
        category: 'No category',
        date: new Date(),
        incomeAmount: 0,
        expenseAmount: 0,
        updatedAt: new Date(),
        removed: false,
        incomeWalletId: null,
        expenseWalletId: action.payload.walletId,
      },
    ],
  }
}

const removeOperationReducer: Reducer<
  RootStoreState,
  {
    type: OperationsActionTypes.REMOVE_OPERATION
    payload: {
      operationId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          removed: true,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          name: action.payload.name,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          category: action.payload.category,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          date: action.payload.date,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        const amount = operation.expenseAmount || operation.incomeAmount
        const walletId =
          operation.expenseWalletId ?? operation.incomeWalletId ?? null

        switch (action.payload.type) {
          case ClientOperationType.INCOME: {
            return {
              ...operation,
              incomeAmount: amount,
              expenseAmount: 0,
              incomeWalletId: walletId,
              expenseWalletId: null,
              updatedAt: new Date(),
            }
          }

          case ClientOperationType.EXPENSE:
            return {
              ...operation,
              incomeAmount: 0,
              expenseAmount: amount,
              incomeWalletId: null,
              expenseWalletId: walletId ?? null,
              updatedAt: new Date(),
            }

          case ClientOperationType.TRANSFER:
            return {
              ...operation,
              incomeAmount: amount,
              expenseAmount: amount,
              incomeWalletId: walletId ?? null,
              expenseWalletId: walletId ?? null,
              updatedAt: new Date(),
            }
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          incomeAmount: action.payload.incomeAmount,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          expenseAmount: action.payload.expenseAmount,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          incomeWalletId: action.payload.incomeWalletId,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    operations: state.operations.map((operation) => {
      if (operation.id === action.payload.operationId) {
        return {
          ...operation,
          expenseWalletId: action.payload.expenseWalletId,
          updatedAt: new Date(),
        }
      }

      return operation
    }),
  }
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
