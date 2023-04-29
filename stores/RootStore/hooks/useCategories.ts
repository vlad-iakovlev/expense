import { useCallback, useMemo } from 'react'
import { useRootStore } from '../RootStore.tsx'
import { getOperations } from '../getters/operations.ts'
import { CategoriesActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
  walletId?: string
}

export const useCategories = ({ groupId, walletId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const categories = useMemo<string[]>(() => {
    return getOperations(state, { groupId, walletId })
      .map((operation) => operation.category)
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort((a, b) => a.localeCompare(b))
  }, [groupId, state, walletId])

  const renameCategory = useCallback(
    (oldName: string, newName: string) => {
      dispatch({
        type: CategoriesActionTypes.RENAME_CATEGORY,
        payload: { oldName, newName },
      })
    },
    [dispatch]
  )

  return {
    categories,
    renameCategory,
  }
}
