import React from 'react'
import { useRootStore } from '../index.jsx'
import { CategoriesActionTypes } from '../types.jsx'

export const useDisabledCategories = () => {
  const { state, dispatch } = useRootStore()

  const toggleCategory = React.useCallback(
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
