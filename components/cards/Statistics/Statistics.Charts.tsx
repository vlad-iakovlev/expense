import { CalculatorIcon } from '@heroicons/react/24/outline'
import { FC, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

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
    <>
      {!!items.length && (
        <Card.Block className="flex gap-3">
          <div className="flex-1 min-w-0 aspect-square">
            <ResponsiveContainer className="">
              <PieChart>
                <Pie
                  className="focus:outline-none"
                  data={items}
                  dataKey="incomeAmount"
                  cx="50%"
                  cy="50%"
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
          </div>

          <div className="flex-1 min-w-0 aspect-square">
            <ResponsiveContainer className="">
              <PieChart>
                <Pie
                  className="focus:outline-none"
                  data={items}
                  dataKey="expenseAmount"
                  cx="50%"
                  cy="50%"
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
          </div>
        </Card.Block>
      )}

      <Card.Text
        prefix={<CalculatorIcon className="w-11 h-6" />}
        label="Total"
        value={
          <div className="font-medium text-right">
            <Amount amount={totalIncome} currency={currency} type="income" />
            <Amount amount={totalExpense} currency={currency} type="expense" />
          </div>
        }
      />
    </>
  )
}
