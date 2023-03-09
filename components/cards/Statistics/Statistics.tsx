import { interpolateTurbo } from 'd3-scale-chromatic'
import { FC, useEffect, useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'
import { Switch } from '../../ui-kit/Switch'

export const StatisticsCard: FC = () => {
  const { statisticsByCategory } = useStatisticsByCategoryContext()

  const [enabledCategories, setEnabledCategories] = useState<
    Record<string, boolean>
  >({})

  const colors = useMemo(() => {
    return statisticsByCategory.items.reduce<Record<string, string>>(
      (acc, item, index) => {
        acc[item.category] = interpolateTurbo(
          index / (statisticsByCategory.items.length - 1)
        )
        return acc
      },
      {}
    )
  }, [statisticsByCategory.items])

  const items = useMemo(() => {
    return statisticsByCategory.items.map((item) => ({
      ...item,
      ...(!enabledCategories[item.category] && {
        incomeAmount: 0,
        expenseAmount: 0,
      }),
    }))
  }, [enabledCategories, statisticsByCategory.items])

  useEffect(() => {
    setEnabledCategories(
      statisticsByCategory.items.reduce<Record<string, boolean>>(
        (acc, item) => {
          acc[item.category] = true
          return acc
        },
        {}
      )
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
        <ResponsiveContainer className="aspect-square">
          <PieChart>
            <Pie
              data={items}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              minAngle={2}
              dataKey="incomeAmount"
            >
              {statisticsByCategory.items.map((item) => (
                <Cell key={item.category} fill={colors[item.category]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              Incomes
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="px-4 sm:px-6 py-2">
        <ResponsiveContainer className="aspect-square">
          <PieChart>
            <Pie
              data={items}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              minAngle={2}
              dataKey="expenseAmount"
            >
              {statisticsByCategory.items.map((item) => (
                <Cell key={item.category} fill={colors[item.category]} />
              ))}
            </Pie>
            <text
              x="50%"
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
          start={
            <Switch
              value={enabledCategories[item.category]}
              onChange={(value) => {
                setEnabledCategories({
                  ...enabledCategories,
                  [item.category]: value,
                })
              }}
            />
          }
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
