import { FunnelIcon } from '@heroicons/react/20/solid'
import { useCallback, useState } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useDisabledCategories } from '../../../contexts/RootStore/hooks/useDisabledCategories.ts'
import { ClientCurrency, ClientStatisticsType } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Switch } from '../../ui-kit/Switch/Switch.tsx'

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

interface Props {
  category: string
  color: string
  amount: number
  currency: ClientCurrency
  type: ClientStatisticsType
}

export const Category = ({
  category,
  color,
  amount,
  currency,
  type,
}: Props) => {
  const { categoryFilter, toggleCategoryFilter } = useCategoryFilter()
  const { disabledCategories, toggleCategory } = useDisabledCategories()

  const isEnabled = !disabledCategories.includes(category)
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsOpen(true)
      }
    },
    [setIsOpen],
  )

  const handleBlur = useCallback((event: React.FocusEvent) => {
    void (async () => {
      const currentTarget = event.currentTarget
      await new Promise(requestAnimationFrame)
      if (!currentTarget.contains(document.activeElement)) setIsOpen(false)
    })()
  }, [])

  const handleEnableCategoryChange = useCallback(
    (value: boolean) => {
      toggleCategory(category, value)
    },
    [category, toggleCategory],
  )

  const handleFilerClick = useCallback(() => {
    toggleCategoryFilter(category)
  }, [category, toggleCategoryFilter])

  return (
    <Card.Item
      prefix={
        <Switch
          style={{ backgroundColor: isEnabled ? color : undefined }}
          value={isEnabled}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Include in total sum"
          onChange={handleEnableCategoryChange}
        />
      }
      suffix={
        <Button
          size="sm"
          theme={categoryFilter === category ? 'green' : 'white'}
          iconStart={<FunnelIcon />}
          tabIndex={isOpen ? 0 : -1}
          role="checkbox"
          aria-checked={categoryFilter === category ? 'true' : 'false'}
          aria-label="Filter operations by category"
          onClick={handleFilerClick}
        />
      }
      label={category}
      value={
        <Amount
          className="font-medium"
          amount={amount}
          currency={currency}
          type={AMOUNT_TYPE[type]}
        />
      }
      aria-disabled="false"
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-label={`${category}: ${formatAmount(amount)} ${
        currency.name ?? currency.symbol
      }`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}
