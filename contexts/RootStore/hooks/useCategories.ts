import { useCallback, useMemo } from 'react'
import { uniq } from '@/utils/uniq.js'
import { useRootStore } from '../RootStore.jsx'
import { getAvailableOperations } from '../getters/operations.js'
import { CategoriesActionTypes } from '../types.jsx'

interface Props {
  groupId?: string
  walletId?: string
}

export const useCategories = ({ groupId, walletId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const categories = useMemo<string[]>(() => {
    const operations = getAvailableOperations(state, { groupId, walletId })
    const categories = uniq(operations.map((operation) => operation.category))
    return categories.sort((a, b) => a.localeCompare(b))
  }, [groupId, state, walletId])

  const renameCategory = useCallback(
    (oldName: string, newName: string) => {
      dispatch({
        type: CategoriesActionTypes.RENAME_CATEGORY,
        payload: { oldName, newName },
      })
    },
    [dispatch],
  )

  return {
    categories,
    renameCategory,
  }
}
