import { produce } from 'immer'
import { CategoriesActionTypes, RootStoreState } from '../types.jsx'

const renameCategoryReducer: React.Reducer<
  RootStoreState,
  {
    type: CategoriesActionTypes.RENAME_CATEGORY
    payload: {
      oldName: string
      newName: string
    }
  }
> = (state, action) =>
  produce(state, (draft) => {
    draft.operations.forEach((operation) => {
      if (operation.category === action.payload.oldName) {
        operation.category = action.payload.newName
        draft.nextSyncTransaction.operations.push(operation.id)
      }
    })
  })

const toggleCategoryReducer: React.Reducer<
  RootStoreState,
  {
    type: CategoriesActionTypes.TOGGLE_CATEGORY
    payload: {
      name: string
      enabled: boolean
    }
  }
> = (state, action) =>
  produce(state, (draft) => {
    draft.disabledCategories = draft.disabledCategories.filter(
      (category) => category !== action.payload.name,
    )

    if (!action.payload.enabled) {
      draft.disabledCategories.push(action.payload.name)
    }
  })

export type CategoriesAction =
  | React.ReducerAction<typeof renameCategoryReducer>
  | React.ReducerAction<typeof toggleCategoryReducer>

export const isCategoriesAction = (action: {
  type: string
  payload?: unknown
}): action is CategoriesAction =>
  Object.values(CategoriesActionTypes).includes(
    action.type as CategoriesActionTypes,
  )

export const categoriesReducer: React.Reducer<
  RootStoreState,
  CategoriesAction
> = (state, action) => {
  switch (action.type) {
    case CategoriesActionTypes.RENAME_CATEGORY:
      return renameCategoryReducer(state, action)

    case CategoriesActionTypes.TOGGLE_CATEGORY:
      return toggleCategoryReducer(state, action)
  }
}
