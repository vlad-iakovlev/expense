import { interpolatePlasma } from 'd3-scale-chromatic'
import { FC, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const StatisticsCard: FC = () => {
  const { statisticsByCategory } = useStatisticsByCategoryContext()

  const colors = useMemo(() => {
    return statisticsByCategory.items.reduce<Record<string, string>>(
      (acc, item, index) => {
        acc[item.category] = interpolatePlasma(
          index / statisticsByCategory.items.length
        )
        return acc
      },
      {}
    )
  }, [statisticsByCategory.items])

  if (!statisticsByCategory.items.length) {
    return null
  }

  return (
    <Card>
      <Card.Title title="Statistics" />

      <Card.Divider />

      <div className="px-4 sm:px-6 py-2">
        <ResponsiveContainer className="aspect-[2/1]">
          <PieChart>
            <Pie
              data={statisticsByCategory.items}
              cx="25%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="incomeAmount"
            >
              {statisticsByCategory.items.map((item) => (
                <Cell key={item.category} fill={colors[item.category]} />
              ))}
            </Pie>
            <text
              x="26%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              Incomes
            </text>
            <Pie
              data={statisticsByCategory.items}
              cx="75%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="expenseAmount"
            >
              {statisticsByCategory.items.map((item) => (
                <Cell key={item.category} fill={colors[item.category]} />
              ))}
            </Pie>
            <text
              x="74%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              Expenses
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {statisticsByCategory.items.map((item) => (
        <Card.Text
          key={item.category}
          end={
            <div className="font-medium text-right">
              <Amount
                amount={item.incomeAmount}
                currency={statisticsByCategory.currency}
                type="income"
              />
              <Amount
                amount={item.expenseAmount}
                currency={statisticsByCategory.currency}
                type="expense"
              />
            </div>
          }
        >
          <div
            className="w-20 h-4 my-1 rounded-full"
            style={{ backgroundColor: colors[item.category] }}
          />
          {item.category}
        </Card.Text>
      ))}
    </Card>
  )
}