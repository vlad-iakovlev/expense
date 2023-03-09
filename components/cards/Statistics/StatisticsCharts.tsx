import { FC } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { StatisticsByCategoryItem } from '../../../api/types/statistics'

interface Props {
  items: StatisticsByCategoryItem[]
  colors: Record<string, string>
}

export const StatisticsCharts: FC<Props> = ({ items, colors }) => {
  return (
    <div className="flex gap-3 px-4 sm:px-6 py-2">
      <ResponsiveContainer className="flex-1 aspect-square">
        <PieChart>
          <Pie
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
              <Cell key={item.category} fill={colors[item.category]} />
            ))}
          </Pie>
          <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">
            Incomes
          </text>
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer className="flex-1 aspect-square">
        <PieChart>
          <Pie
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
              <Cell key={item.category} fill={colors[item.category]} />
            ))}
          </Pie>
          <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">
            Expenses
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
