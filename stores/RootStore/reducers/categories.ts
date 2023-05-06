import { produce } from 'immer'
import { Reducer, ReducerAction } from 'react'
import { CategoriesActionTypes, RootStoreState } from '../types.tsx'

const renameCategoryReducer: Reducer<
  RootStoreState,
  {
    type: CategoriesActionTypes.RENAME_CATEGORY
    payload: {
      oldName: string
      newName: string
    }
  }
> = (state, action) => {
  return produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.category === action.payload.oldName) {
        operation.category = action.payload.newName
        draft.nextSyncTransaction.operations.push(operation.id)
      }
    })
  })
}

export type CategoriesAction = ReducerAction<typeof renameCategoryReducer>

export const isCategoriesAction = (action: {
  type: string
  payload?: unknown
}): action is CategoriesAction => {
  return Object.values(CategoriesActionTypes).includes(
    action.type as CategoriesActionTypes
  )
}

export const categoriesReducer: Reducer<RootStoreState, CategoriesAction> = (
  state,
  action
) => {
  switch (action.type) {
    case CategoriesActionTypes.RENAME_CATEGORY:
      return renameCategoryReducer(state, action)
  }
}
