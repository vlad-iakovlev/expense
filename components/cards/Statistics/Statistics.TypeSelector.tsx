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
        theme={value === ClientStatisticsType.EXPENSES ? 'error' : 'secondary'}
        size="sm"
        onClick={() => onChange(ClientStatisticsType.EXPENSES)}
      >
        Expenses
      </Button>

      <Button
        disabled={value === ClientStatisticsType.INCOMES}
        rounded
        theme={value === ClientStatisticsType.INCOMES ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onChange(ClientStatisticsType.INCOMES)}
      >
        Incomes
      </Button>
    </>
  )
}
