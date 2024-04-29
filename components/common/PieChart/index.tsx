import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { GetSectorProps } from '@/utils/client/getSector.js'
import { Sector } from './Sector.jsx'

export interface PieChartItem {
  id: string
  color: string
  value: number
}

export interface PieChartProps {
  className?: string
  items: PieChartItem[]
  renderTooltip: (itemId: string | null, total: number) => React.ReactNode
}

export const PieChart = ({
  className,
  items,
  renderTooltip,
}: PieChartProps) => {
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.value, 0),
    [items],
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
        <circle
          className="text-white dark:text-zinc-800"
          cx="50"
          cy="50"
          r="40"
          fill="currentColor"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {renderTooltip(activeId, total)}
      </div>
    </div>
  )
}
