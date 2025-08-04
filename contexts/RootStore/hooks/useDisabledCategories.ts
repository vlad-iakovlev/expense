import { useCallback } from 'react'
import { useRootStore } from '../index'
import { CategoriesActionTypes } from '../types'

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
