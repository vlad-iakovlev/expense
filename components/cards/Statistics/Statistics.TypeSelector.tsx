import { ClientStatisticsType } from '../../../types/client.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  value: ClientStatisticsType
  onChange: (value: ClientStatisticsType) => void
}

export const TypeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <Button
        disabled={value === ClientStatisticsType.EXPENSES}
        rounded
        size="sm"
        theme={value === ClientStatisticsType.EXPENSES ? 'red' : 'white'}
        onClick={() => onChange(ClientStatisticsType.EXPENSES)}
      >
        Expenses
      </Button>

      <Button
        disabled={value === ClientStatisticsType.INCOMES}
        rounded
        size="sm"
        theme={value === ClientStatisticsType.INCOMES ? 'green' : 'white'}
        onClick={() => onChange(ClientStatisticsType.INCOMES)}
      >
        Incomes
      </Button>
    </>
  )
}
