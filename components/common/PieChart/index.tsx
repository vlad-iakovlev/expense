import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Decimal } from '@/utils/Decimal'
import { GetSectorProps } from '@/utils/client/getSector'
import { Sector } from './Sector'

export interface PieChartItem {
  id: string
  color: string
  value: Decimal
}

export interface PieChartProps {
  className?: string
  items: PieChartItem[]
  renderTooltip: (itemId: string | null, total: Decimal) => React.ReactNode
}

export const PieChart = ({
  className,
  items,
  renderTooltip,
}: PieChartProps) => {
  const total = React.useMemo(
    () => items.reduce((acc, item) => acc.add(item.value), Decimal.ZERO),
    [items],
  )

  const [activeId, setActiveId] = React.useState<string | null>(null)

  const sectors = React.useMemo(() => {
    let lastAngle = 0

    return items.map((item) => {
      const sectorProps: GetSectorProps = {
        x: 50,
        y: 50,
        radius: item.id === activeId ? 50 : 48,
        start: lastAngle,
        end: total.neq(Decimal.ZERO)
          ? lastAngle + (item.value.toNumber() / total.toNumber()) * 360
          : lastAngle,
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
