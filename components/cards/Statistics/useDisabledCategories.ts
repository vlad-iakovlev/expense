import { useCallback, useMemo, useState } from 'react'
import { ClientStatisticsByCategory } from '../../../types/client.ts'

export const useDisabledCategories = (items: ClientStatisticsByCategory[]) => {
  const [disabled, setDisabled] = useState<Record<string, boolean>>({})

  const chartItems = useMemo(
    () => items.filter((item) => !disabled[item.category]),
    [disabled, items]
  )

  const isCategoryDisabled = useCallback(
    (category: string) => !!disabled[category],
    [disabled]
  )

  const setCategoryDisabled = useCallback(
    (category: string, disabled: boolean) => {
      setDisabled((disabledCategories) => {
        return {
          ...disabledCategories,
          [category]: disabled,
        }
      })
    },
    []
  )

  return {
    chartItems,
    isCategoryDisabled,
    setCategoryDisabled,
  }
}
