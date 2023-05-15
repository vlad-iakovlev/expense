import { FC, ReactNode, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { GetSectorProps } from '../../../utils/client/getSector.ts'
import { Sector } from './PieChart.Sector.tsx'

export interface PieChartItem {
  id: string
  color: string
  value: number
}

export interface PieChartProps {
  className?: string
  items: PieChartItem[]
  renderTooltip: (itemId: string | null, total: number) => ReactNode
}

export const PieChart: FC<PieChartProps> = ({
  className,
  items,
  renderTooltip,
}) => {
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.value, 0),
    [items]
  )

  const [activeId, setActiveId] = useState<string | null>(null)

  const sectors = useMemo(() => {
    let lastAngle = 0

    return items.map((item) => {
      const sectorProps: GetSectorProps = {
        x: 50,
        y: 50,
        radius: item.id === activeId ? 50 : 48,
        start: lastAngle,
        end: total ? lastAngle + (item.value / total) * 360 : lastAngle,
      }

      lastAngle = sectorProps.end

      return (
        <Sector
          key={item.id}
          sectorProps={sectorProps}
          color={item.color}
          onPointerEnter={() => setActiveId(item.id)}
          onPointerLeave={() => setActiveId(null)}
        />
      )
    })
  }, [activeId, items, total])

  return (
    <div className={twMerge('relative aspect-square', className)}>
      <svg className="absolute inset-0" viewBox="0 0 100 100">
        {sectors}
        <circle cx="50" cy="50" r="40" fill="white" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {renderTooltip(activeId, total)}
      </div>
    </div>
  )
}
