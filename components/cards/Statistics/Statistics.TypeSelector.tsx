import { FC, useCallback, useMemo } from 'react'
import { ClientStatisticsType } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

const options: CardSelectOption<ClientStatisticsType>[] = [
  {
    id: ClientStatisticsType.EXPENSES,
    label: 'Expenses',
  },
  {
    id: ClientStatisticsType.INCOMES,
    label: 'Incomes',
  },
]

interface Props {
  type: ClientStatisticsType
  setType: (type: ClientStatisticsType) => void
}

export const TypeSelector: FC<Props> = ({ type, setType }) => {
  const value = useMemo(() => {
    return options.find((option) => type === option.id) ?? options[0]
  }, [type])

  const handleChange = useCallback(
    (option: CardSelectOption<ClientStatisticsType>) => {
      setType(option.id)
    },
    [setType]
  )

  return (
    <>
      <Card.Select
        label="Type"
        options={options}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}
