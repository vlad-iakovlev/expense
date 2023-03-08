import { FC, useMemo } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Card } from '../../ui-kit/Card'

export const StatisticsByCategoryCard: FC = () => {
  const { statisticsByCategory } = useStatisticsByCategoryContext()

  const statistics = useMemo(() => {
    return statisticsByCategory.items.map((item) => ({
      category: item.category,
      incomeAmount: item.incomeAmount / 1e4,
      expenseAmount: item.expenseAmount / 1e4,
    }))
  }, [statisticsByCategory.items])

  if (!statistics.length) {
    return null
  }

  return (
    <Card>
      <Card.Title title="Statistics by category" />

      <Card.Divider />

      <div className="px-4 sm:px-6 py-2">
        <ResponsiveContainer className="aspect-square" width="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="50%" data={statistics}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis />
            <Radar
              dataKey="incomeAmount"
              stroke="#15803d"
              fill="#15803d"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="expenseAmount"
              stroke="#b91c1c"
              fill="#b91c1c"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
