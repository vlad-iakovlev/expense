import { useCallback } from 'react'
import { useRootStore } from '../RootStore.jsx'
import { CategoriesActionTypes } from '../types.jsx'

export const useDisabledCategories = () => {
  const { state, dispatch } = useRootStore()

  const toggleCategory = useCallback(
    (name: string, enabled: boolean) => {
      dispatch({
        type: CategoriesActionTypes.TOGGLE_CATEGORY,
        payload: { name, enabled },
      })
    },
    [dispatch],
  )

  return {
    disabledCategories: state.disabledCategories,
    toggleCategory,
  }
}
