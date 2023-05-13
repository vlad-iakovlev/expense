import { FC, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsByCategory[]
}

export const Charts: FC<Props> = ({ currency, items }) => {
  const totalIncome = useMemo(() => {
    return items.reduce<number>((acc, item) => acc + item.incomeAmount, 0)
  }, [items])

  const totalExpense = useMemo(() => {
    return items.reduce<number>((acc, item) => acc + item.expenseAmount, 0)
  }, [items])

  return (
    <div className="flex gap-3 px-4 sm:px-6 py-2">
      <div className="relative flex-1 flex items-center justify-center min-w-0 aspect-square">
        <ResponsiveContainer className="absolute inset-0">
          <PieChart>
            <Pie
              className="focus:outline-none"
              data={items}
              dataKey="incomeAmount"
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              minAngle={2}
              animationBegin={0}
            >
              {items.map((item) => (
                <Cell key={item.category} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Amount
          className="relative py-1 px-2 font-medium bg-white bg-opacity-90 rounded-sm truncate"
          amount={totalIncome}
          currency={currency}
          type="income"
        />
      </div>

      <div className="relative flex-1 flex items-center justify-center min-w-0 aspect-square">
        <ResponsiveContainer className="absolute inset-0">
          <PieChart>
            <Pie
              className="focus:outline-none"
              data={items}
              dataKey="expenseAmount"
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              minAngle={2}
              animationBegin={0}
            >
              {items.map((item) => (
                <Cell key={item.category} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <Amount
          className="relative py-1 px-2 font-medium bg-white bg-opacity-90 rounded-sm truncate"
          amount={totalExpense}
          currency={currency}
          type="expense"
        />
      </div>
    </div>
  )
}
