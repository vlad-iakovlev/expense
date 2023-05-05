import { useCallback, useMemo } from 'react'
import * as P from '../../../utils/piped/index.ts'
import { useRootStore } from '../RootStore.tsx'
import { getAvailableOperations } from '../getters/operations.ts'
import { CategoriesActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
  walletId?: string
}

export const useCategories = ({ groupId, walletId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const categories = useMemo<string[]>(() => {
    return P.pipe(getAvailableOperations(state, { groupId, walletId }))
      .pipe(P.map(P.prop('category')))
      .pipe(P.uniq())
      .pipe(P.sort((a, b) => a.localeCompare(b)))
      .value()
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
